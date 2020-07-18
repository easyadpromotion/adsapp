
 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/alert.service';
import { LoaderService } from 'src/app/loader.service';
import { UtilService } from 'src/app/util.service';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { FirebaseDbService } from 'src/app/firebase-db.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-createPhotoFrame-list',
  templateUrl: './create-photo-frame-list.page.html',
  styleUrls: ['./create-photo-frame-list.page.scss'],
})
export class CreatePhotoFrameListPage implements OnInit {

  json: any=[];
  userDetails
  constructor(private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public firebase:FirebaseDbService,public userService:UserService,
    public loaderService: LoaderService,public utilService:UtilService, public menuCtrl:MenuController) {
      this.userDetails = JSON.parse(localStorage.getItem('userData'))
  }

  openMenu(){
    this.menuCtrl.open();
  } 
 

  loadData(){
    this.loaderService.showLoader('Fetching details, please wait').then(()=>{
      let fb=this.firebase.getDb().collection('photoads', ref =>
      ref.where('userId', '==', this.userService.getUserId())
    ).snapshotChanges().subscribe(res=>{
      this.json=[];
      res.forEach(item=>{
        let json=item.payload.doc.data();
            var now = moment(new Date(json['startDate'])); //todays date
            var end = moment(new Date(json['endDate'])); // another date
            var duration = moment.duration(end.diff(now));
            var days = duration.asHours();
            json['diff']=days.toFixed(2);
            json['id']=item.payload.doc.id;
            this.json.push(json);
      })
      this.json.reverse();
      this.loaderService.hideLoader();
      
      console.log(res)
    })
   
    });
  }

  ionViewWillEnter(){
    localStorage.removeItem('form');
    localStorage.removeItem('address');
    localStorage.removeItem('questions');
    this.loadData();
  }

  ngOnInit() { 

  }

  add() {
    this.router.navigate(['/create-photo-frame-add'])
  }

  details(data) {
    localStorage.setItem('createPhotoFrameDetails', JSON.stringify(data));
    this.router.navigate(['/create-photo-frame-details'])
  }
}


