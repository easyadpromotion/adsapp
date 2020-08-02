import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoaderService } from 'src/app/loader.service';
import { AlertService } from 'src/app/alert.service';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/util.service';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { FirebaseDbService } from 'src/app/firebase-db.service';

@Component({
  selector: 'app-photoads',
  templateUrl: './photoads.page.html',
  styleUrls: ['./photoads.page.scss'],
})
export class PhotoadsPage implements OnInit {
  json:any=[];
  data={};
  myDate=[]
  dateObj
  monthday
  year
  startDate
  endDate
  m
  n
  newdate
  location

  constructor(public httpService:HttpServiceService, public loaderService:LoaderService,
    public alertService:AlertService,public firebase:FirebaseDbService,
    public userService:UserService, private router:Router, public utilService:UtilService,      
    public menuCtrl:MenuController) { }

  ngOnInit() {
    this.loadData();
   }

  capitalize(name){
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  loadData(){
    this.loaderService.showLoader('');
    this.json=[];
    this.myDate=[];
    let lat=localStorage.getItem('userLat');
    let lng=localStorage.getItem('userLng');
    this.location =  JSON.parse(localStorage.getItem('addressGeo'))
    if(!this.location){
      this.alertService.presentAlert('Error','Unable to fetch location, please reload application','ok');
      this.loaderService.hideLoader();
      
      return 
    }
    let fb=this.firebase.getDb().collection('photoads', ref =>
      ref.where('isAvailable', '==', true)
    ).snapshotChanges().subscribe(res=>{
      console.log(res)
      this.json=[];
      res.forEach(item=>{
        console.log(item)
        let json=item.payload.doc.data();
        json['id']=item.payload.doc.id;
        let photoAddress = json['locality'].address.split(',')
        this.startDate = json['startDate'];
          
              this.endDate=json['endDate']
              this.m=moment(this.startDate)
              this.n=moment(this.endDate)
              console.log("this",this.m )
              if(moment( this.startDate).isBefore(new Date().toISOString()) && moment( this.endDate).isAfter(new Date().toISOString()))
              {
              }else{
                return;
              }
        
        this.location.forEach(element => {
          console.log(photoAddress[0] , JSON.stringify(element.long_name), JSON.stringify(element.short_name))
          if(photoAddress[0] == element.long_name || photoAddress[0] == element.short_name){
            json['earned']=json['users'].indexOf(this.userService.getUserId())>-1
            this.json.push(json);
          }
        })
      
      console.log(res)
      })
      this.json.reverse();
      this.loaderService.hideLoader();
    });
  }

ionViewWillEnter()
{


}




  photoDetails(data){
    localStorage.setItem('photoDetails', JSON.stringify(data));
    this.router.navigate(['/photoad-detail'])
  }

  openMenu(){
      this.menuCtrl.open();
    }

    getSplittedname(url){
      let n=url.split('/');
      return n[n.length-1];
    }

    add() {
      this.router.navigate(['/create-photo-frame-add'])
    }


}
