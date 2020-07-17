
 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/alert.service';
import { LoaderService } from 'src/app/loader.service';
import { UtilService } from 'src/app/util.service';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';

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
    public loaderService: LoaderService,public utilService:UtilService, public menuCtrl:MenuController) {
      this.userDetails = JSON.parse(localStorage.getItem('userData'))
  }

  openMenu(){
    this.menuCtrl.open();
  } 
 

  loadData(){
    this.loaderService.showLoader('Fetching details, please wait').then(()=>{
      try{
        this.httpService.postApi({userId:this.userDetails[0]['_id']},'createPhotoFrame/getByCondition').subscribe((res: any) => {
          console.log(res)
          
          this.json = res.data;
          this.json.reverse()
          this.json.forEach(element => {
            var now = moment(new Date(element.startDate)); //todays date
var end = moment(new Date(element.endDate)); // another date
var duration = moment.duration(end.diff(now));
var days = duration.asHours();
            element.diff=days.toFixed(2);
          });
          this.loaderService.hideLoader();
         },(err)=>{
          
          this.loaderService.hideLoader();
          this.alertService.presentNetworkAlert();
         });
      }catch(e){
        this.loaderService.hideLoader();
      }
   
    });
  }

  ionViewWillEnter(){
    localStorage.removeItem('form');
    localStorage.removeItem('address');
    this.loadData();
  }

  ngOnInit() { this.loaderService.hideLoader();
    
  }
  add() {
    this.router.navigate(['/create-photo-frame-add'])
  }

  details(data) {
    localStorage.setItem('createPhotoFrameDetails', JSON.stringify(data));
    this.router.navigate(['/create-photo-frame-details'])
  }
}


