import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpServiceService } from 'src/app/http-service.service';
import { AlertService } from 'src/app/alert.service';
import { LoaderService } from 'src/app/loader.service';
import { UtilService } from 'src/app/util.service';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { UserService } from 'src/app/user.service';
import { FirebaseDbService } from 'src/app/firebase-db.service';
@Component({
  selector: 'app-create-video-list',
  templateUrl: './create-video-list.page.html',
  styleUrls: ['./create-video-list.page.scss'],
})
export class CreateVideoListPage implements OnInit {

  json: any=[];
  userDetails;
  constructor(private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public userService:UserService,public firebase:FirebaseDbService,
    public loaderService: LoaderService,public utilService:UtilService, public menuCtrl:MenuController) {
      this.userDetails = JSON.parse(localStorage.getItem('userData'))
  }
 
  openMenu(){
      this.menuCtrl.open();
    }
  
 
    loadData(){
      this.loaderService.showLoader('Fetching details, please wait').then(()=>{
        let fb=this.firebase.getDb().collection('videoads', ref =>
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
        
        console.log(this.json)
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
    this.router.navigate(['/createVideo-add'])
  }

  details(data) {
    localStorage.setItem('createVideoDetails', JSON.stringify(data));
    this.router.navigate(['/create-video-details'])
  }
}
