import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { UtilService } from 'src/app/util.service';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { LoaderService } from 'src/app/loader.service';
import { UserService } from 'src/app/user.service';
import { FirebaseDbService } from 'src/app/firebase-db.service';
@Component({
  selector: 'app-survey-questions-list',
  templateUrl: './surveyQuestions-list.page.html',
  styleUrls: ['./survey-questions-list.page.scss'],
})
export class SurveyQuestionsListPage implements OnInit {
  json:any=[];
  userDetails
  constructor(public httpService:HttpServiceService, private router:Router, public utilService:UtilService,  
    public menuCtrl:MenuController,public loaderService:LoaderService,public userService:UserService,public firebase:FirebaseDbService) { 
      this.userDetails = JSON.parse(localStorage.getItem('userData'))
    }

  
    loadData(){
      this.loaderService.showLoader('Fetching details, please wait').then(()=>{
        let fb=this.firebase.getDb().collection('surveyads', ref =>
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


  view(data){
    localStorage.setItem('surveyDetails', JSON.stringify(data));
    this.router.navigate(['/survey-questions-details'])
  }
  openMenu(){
    this.menuCtrl.open();
  }

  add() {
    this.router.navigate(['/survey-questions-add'])
  }
}
