import { Component } from '@angular/core';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { google } from "google-maps";

declare var google : google;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  user
  public appPages = [
    
    {
      title: 'Home',
      url: '/home',
      icon: 'home-outline',
      roles:["Franchise", "Vendor", "User", "Admin"]
    },
    // {
    //   title: 'Profile',
    //   url: '/profile',
    //   icon: 'person-outline',
    //   roles:["Admin","User"]
    // },
    
    {
      title: 'My Ads',
      url: '/my-ads',
      icon: 'speedometer-outline',
      roles:[ "Vendor", "User"]
    },
    
    {
      title: 'Video Ads',
      url: '/videoads',
      icon: 'videocam-outline',
      roles:[ "User"]
    },
    {
      title: 'Survey Ads',
      url: '/surveyads',
      icon: 'checkmark-done-outline',
      roles:["User"]
    },
    {
      title: 'Frame Ads',
      url: '/photoads',
      icon: 'image-outline',
      roles:["User"]
    },
   
    {
      title: 'Wallet Transactions',
      url: '/wallet-transactions-list',
      icon: 'timer-outline',
      roles:["Franchise", "Vendor", "User"]
    },
    // {
    //   title: 'Change Password',
    //   url: '/change-password',
    //   icon: 'key-outline',
    //   roles:["Franchise", "Vendor", "User", "Admin"]
    // },
    {
      title: 'Terms and Coditions',
      url: '/terms-conditions',
      icon: 'checkmark-done-outline',
      roles:["Franchise", "Vendor", "User", "Admin"]
    },
  
    {
      title: 'How to Earn',
      url: '/how-to-earn',
      icon: 'layers-outline',
      roles:["Franchise", "Vendor", "User", "Admin"]
    },
    // {
    //   title: 'Help and Support',
    //   url: '/help',
    //   icon: 'key-outline',
    //   roles:["Franchise", "Vendor", "User", "Admin"]
    // },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'key-outline',
      roles:["Franchise", "Vendor", "User", "Admin"]
    }
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu:MenuController,
    private fcm: FCM,
    private geolocation: Geolocation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        localStorage.setItem('userLat',resp.coords.latitude+"");
        localStorage.setItem('userLng',resp.coords.longitude+"");
        // localStorage.setItem('userLat',"16.5420206"); 
        // localStorage.setItem('userLng',"80.637519");
        let latlng = {lat: parseFloat(resp.coords.latitude+""), lng: parseFloat(resp.coords.longitude+"")};
        // let latlng = {lat: parseFloat("16.5420206"), lng: parseFloat("80.637519")};
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': latlng}, (results, status) => {
          console.log(results,status)
          localStorage.setItem('addressGeo',JSON.stringify(results[0].address_components))
          results[0].address_components.forEach((item:any)=>{
            if(item.types.indexOf("sublocality_level_2")>-1)
            localStorage.setItem('area',(item.short_name));
            return;
          })
          if(localStorage.getItem('area')===null){
            results[0].address_components.forEach((item:any)=>{
              if(item.types.indexOf("sublocality_level_1")>-1)
              localStorage.setItem('area',(item.short_name));
              return;
            })
          }
          if(localStorage.getItem('area')===null){
            results[0].address_components.forEach((item:any)=>{
              if(item.types.indexOf("sublocality")>-1)
              localStorage.setItem('area',(item.short_name));
              return;
            })
          }

        })
       }).catch((error) => { 
      
         console.log('Error getting location', error);
       });
       
       let watch = this.geolocation.watchPosition();
       watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        localStorage.setItem('userLat',data.coords.latitude+"");
        localStorage.setItem('userLng',data.coords.longitude+"");
       });

       if(this.fcm){
        // get FCM token
      this.fcm.getToken().then(token => {
        console.log(token);
        localStorage.setItem('fcm',token);
      });

      // ionic push notification example
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        alert('received')
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });      

      // refresh the FCM token
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
        localStorage.setItem('fcm',token);
        
      });
       }
      
      // this.menu.enable(false);
    });
  }
}
