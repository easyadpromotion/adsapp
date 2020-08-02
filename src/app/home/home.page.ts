import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoaderService } from 'src/app/loader.service';
import { IonSlides } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FirebaseDbService } from '../firebase-db.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  role;
  userWAmount;
  id
  user
  userLocation;
  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };
  data=[
  ]

  version="1.0";
  
  profilePic
    constructor(public menuCtrl: MenuController,
      public alertCtrl:AlertController, 
      public loaderService: LoaderService, public userService:UserService,private router: Router, public geolocation: Geolocation, public httpService: HttpServiceService,public platform:Platform,public firebase:FirebaseDbService) {
      if(localStorage.getItem('key')===null)
      {
        this.router.navigate(['/home'])
      }
      if(localStorage.getItem('userData')==null){
        this.router.navigateByUrl('/login')
      }
     }
  
    ngOnInit() { this.loaderService.hideLoader();
  
      this.firebase.readDataCond('homeads').snapshotChanges().subscribe(res=>{
        console.log({res})
        res.forEach(item=>{
          this.data.push(item.payload.doc.data()['photo']);
        })
      });

      this.firebase.readDataCond('version').snapshotChanges().subscribe(res=>{
        console.log({res})
        res.forEach(async (item)=>{
          let version=item.payload.doc.data()['version'];

          if(this.version!=version){
            let alert = await this.alertCtrl.create({
              message: 'New version available, Please update from play store',
              buttons: [
                {
                  text: 'Okay',
                  handler: data => {
                    navigator['app'].exitApp();
                    
                  }
                }
              ]
            });
            alert.present();
          }
        });
      });  
     
      if(localStorage.getItem('userData')==null){
        this.router.navigateByUrl('/login')
      }
      this.loaderService.hideLoader()
    }
  
   
  
    ionViewWillEnter()
    {

      
      
      if(localStorage.getItem('userData')==null){
        this.router.navigateByUrl('/login')
      }
      this.user = JSON.parse(localStorage.getItem('userData'))
      console.log("User",this.user)
     this.profilePic=this.user['profilePic']!=''?this.getSplittedname(this.user['profilePic']):null;
    
      this.userLocation=this.userService.getUserLocation();
      this.role = this.userService.getRole()
      console.log(this.role)
      //console.log(this.userService.getWalletAmount())
      this.userWAmount = this.userService.getWalletAmount()
      console.log('wallet',this.userWAmount)
      this.id = this.userService.getUserId()
      console.log(this.id);
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        localStorage.setItem('userLat',resp.coords.latitude+"");
        localStorage.setItem('userLng',resp.coords.longitude+"");
        let latlng = {lat: parseFloat(resp.coords.latitude+""), lng: parseFloat(resp.coords.longitude+"")};
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': latlng}, (results, status) => {
          console.log(results,status)
          this.userService.updateUser({addressGeo:results[0].address_components})
          results[0].address_components.forEach((item:any)=>{
            if(item.types.indexOf("sublocality_level_2")>-1)
            {localStorage.setItem('area',(item.short_name));}
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
          this.loaderService.hideLoader();
  
        })
       }).catch((error) => { 
        this.loaderService.hideLoader();
         console.log('Error getting location', error);
       });
       
       let watch = this.geolocation.watchPosition();
       watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        console.log('subscribed')
        localStorage.setItem('userLat',data.coords.latitude+"");
        localStorage.setItem('userLng',data.coords.longitude+"");
        this.loaderService.hideLoader();
       });
     
  
    }
  
    openMenu() {
      this.menuCtrl.open();
    }
    logout(){
      localStorage.removeItem('userData')
        // localStorage.clear();
    
      this.router.navigate(['/login'])
     // this.loaderService.hideLoader();
      
    }
  
  
    getSplittedname(url){
      let n=url.replace('public/','');
      return n;
    }
  }
