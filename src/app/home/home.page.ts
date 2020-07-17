import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoaderService } from 'src/app/loader.service';
import { IonSlides } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
    "data:image/jpeg;base64,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"
    ,"data:image/jpeg;base64,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"
  ]
  
  profilePic
    constructor(public menuCtrl: MenuController,public loaderService: LoaderService, public userService:UserService,private router: Router, public geolocation: Geolocation, public httpService: HttpServiceService) {
      if(localStorage.getItem('key')===null)
      {
        this.router.navigate(['/home'])
      }
     }
  
    ngOnInit() { this.loaderService.hideLoader();
  
      
      // this.httpService.postApi({_id:this.id},'user/getByCondition').subscribe((res: any) => {
      //   console.log(res.data);
       
      //  });
      this.loaderService.hideLoader()
    }
  
   
  
    ionViewWillEnter()
    {
      
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