
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { HttpServiceService } from 'src/app/http-service.service';
  import { LoadingController, AlertController } from '@ionic/angular';
  import { AlertService } from 'src/app/alert.service';
  import { LoaderService } from 'src/app/loader.service';
  import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-survey-questions-details',
  templateUrl: './surveyQuestions-details.page.html',
  styleUrls: ['./survey-questions-details.page.scss'],
})
export class SurveyQuestionsDetailsPage implements OnInit {
  surveyId;
  surveyQuestionsList;
  json:any=[];
  viewUsers:any=[];
  likedUsers:any=[]
    commentUsers:any=[]
    action="liked";
  users={};
  id
  constructor( private router:Router,public loadingCtrl: LoadingController,
    public httpService:HttpServiceService, public alertService:AlertService,
    public userService:UserService,
    public loaderService:LoaderService) {
    this.surveyQuestionsList = JSON.parse(localStorage.getItem('surveyDetails'))
    console.log("questions",this.surveyQuestionsList)
  }

  ngOnInit() { this.loaderService.hideLoader();
    // this.loaderService.showLoader('Please wait').then(()=>{
    //   this.httpService.postApi({},'user/getByCondition').subscribe(res=>{
    //     console.log(res);
        
    //     let tmp={};
    //     res.data.forEach(item=>{
    //       tmp[item["_id"]]=item;
    //     })
    //     this.users=tmp;
    //     console.log(tmp);
    //     this.loaderService.hideLoader()
    //     this.likeUsers();
        
    //   },err=>{
    //     this.loaderService.hideLoader();
    //     this.alertService.presentNetworkAlert();
    //   })
    // })
    
  }



  ionViewWillEnter()
  {
    this.loaderService.showLoader('Please wait').then(()=>{
      this.httpService.postApi({},'user/getByCondition').subscribe(res=>{
        console.log(res);
        
        let tmp={};
        res.data.forEach(item=>{
          tmp[item["_id"]]=item;
        })
        this.users=tmp;
        console.log(tmp);
        this.loaderService.hideLoader()
        this.likeUsers();
        
      },err=>{
        this.loaderService.hideLoader();
        this.alertService.presentNetworkAlert();
      })
    })
  }



  toggleStatus(id,status){
    let data={
      isAvailable:status
    }
    this.loaderService.showLoader('Updating, please wait').then(()=>{
      try{
        this.httpService.postApi(data, 'surveyQuestions/updateDetails' + id).subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            this.alertService.presentAlert('Success','Successfully updated','Okay');
            this.router.navigate(['/surveyQuestions-list'])
          } else {
            this.alertService.presentAlert('Error',res["message"],'Okay');
          }
        },(err)=>{
          
          this.loaderService.hideLoader();
          this.alertService.presentNetworkAlert();
         });    
      }catch(e){
        this.loaderService.hideLoader();
        this.alertService.presentAlert('Error','Something went wrong, please try again','Okay');
      }
    })
  }

  delete(data) {
    data['isAvailable']=0
    this.id=data['_id']
    this.loaderService.showLoader('Deleting, please wait').then(()=>{
      try{
        this.httpService.postApi(data, 'surveyQuestions/updateDetails/' +data.id).subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            this.alertService.presentAlert('Success','Successfully deleted','Okay');
            this.router.navigate(['/survey-questions-list'])
            this.loaderService.hideLoader();
          } else {
            this.alertService.presentAlert('Error',res["message"],'Okay');
          }
        },(err)=>{
          
          this.loaderService.hideLoader();
          this.alertService.presentNetworkAlert();
         });    
      }catch(e){
        this.loaderService.hideLoader();
        this.alertService.presentAlert('Error','Something went wrong, please try again','Okay');
      }
    })

  }
  edit(data) {
    console.log(data)
    localStorage.setItem('editSurveyQuestionsData', JSON.stringify(data));
    this.router.navigate(['/survey-questions-edit'])
  }
  
  likeUsers(){
    this.action="liked";
    console.log("likedUser photo id",this.surveyQuestionsList['_id'])
    this.loaderService.showLoader('Please wait ').then(()=>{
      try{
        this.httpService.postApi({ videoFrameSurveyId: this.surveyQuestionsList['_id']}, 'like/getByCondition').subscribe((res: any) => {
          
          if (res["success"]) {
            console.log("get from likes",res)
            this.likedUsers = res['data']
            
              this.loaderService.hideLoader();
              
           
          } else {
            this.loaderService.hideLoader();
            this.alertService.presentAlert('Error',res["message"],'Okay');
          }
        },(err)=>{
          
          this.loaderService.hideLoader();
          this.alertService.presentNetworkAlert();
         });    
      }catch(e){
        this.loaderService.hideLoader();
        this.alertService.presentAlert('Error','Something went wrong, please try again','Okay');
      }
    })
  }

  commentedUsers(){
    this.action='comments';
    console.log("commented user photo id",this.surveyQuestionsList['_id'])
    this.loaderService.showLoader('Please wait ').then(()=>{
      try{
        this.httpService.postApi({ videoFrameSurveyId: this.surveyQuestionsList['_id']}, 'comment/getByCondition').subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            console.log("get from comments",res)
            this.commentUsers = res['data']
            
          } else {
            this.alertService.presentAlert('Error',res["message"],'Okay');
          }
        },(err)=>{
          
          this.loaderService.hideLoader();
          this.alertService.presentNetworkAlert();
         });    
      }catch(e){
        this.loaderService.hideLoader();
        this.alertService.presentAlert('Error','Something went wrong, please try again','Okay');
      }
    })
  }
  viewHistory(){
    this.action='views';
    console.log("viewhistory photo id",this.surveyQuestionsList['_id'])
    this.loaderService.showLoader('Please wait').then(()=>{
      try{
        this.httpService.postApi({ videoFrameSurveyId: this.surveyQuestionsList['_id']}, 'viewHistory/getByCondition').subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            console.log("get from history",res)
            this.viewUsers = res['data']
           
          } else {
            this.alertService.presentAlert('Error',res["message"],'Okay');
          }
        },(err)=>{
          
          this.loaderService.hideLoader();
          this.alertService.presentNetworkAlert();
         });    
      }catch(e){
        this.loaderService.hideLoader();
        this.alertService.presentAlert('Error','Something went wrong, please try again','Okay');
      }
    })
  }


}

