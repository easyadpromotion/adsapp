
  import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/alert.service';
import { LoaderService } from 'src/app/loader.service';
import { UserService } from 'src/app/user.service';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-createPhotoFrame-details',
  templateUrl: './create-photo-frame-details.page.html',
  styleUrls: ['./create-photo-frame-details.page.scss'],
})

export class CreatePhotoFrameDetailsPage implements OnInit {
  
  createPhotoFrame;
    likedUsers:any=[]
    commentUsers:any=[]
    viewUsers:any=[]
    action="liked";
    users:any={};
  id
  constructor( private router:Router,public loadingCtrl: LoadingController,
    public httpService:HttpServiceService, public alertService:AlertService,
    public userService:UserService,
    public loaderService:LoaderService,public utilService:UtilService) {
    this.createPhotoFrame = JSON.parse(localStorage.getItem('createPhotoFrameDetails'))
    console.log("photo frame details",this.createPhotoFrame)
  }

  ngOnInit() { this.loaderService.hideLoader();
    // this.loaderService.showLoader('Please wait').then(()=>{
      this.httpService.postApi({},'user/getByCondition').subscribe(res=>{
        console.log(res);
        
        let tmp={};
        res.data.forEach(item=>{
          tmp[item["_id"]]=item;
        })
        this.users=tmp;
        console.log(tmp);
        this.loaderService.hideLoader()
        // this.likeUsers();
        
      },err=>{
        this.loaderService.hideLoader();
        this.alertService.presentNetworkAlert();
      })
    
  }

  findUser(id){
    return this.users.map(item=>{
      return item._id==id;
    })
  }

  toggleStatus(id,status){
    let data={
      isAvailable:status
    }
    this.loaderService.showLoader('Updating, please wait ').then(()=>{
      try{
        this.httpService.postApi(data, 'createPhotoFrame/updateDetails' + id).subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            this.alertService.presentAlert('Success','Successfully updated','Okay');
            this.router.navigate(['/createPhotoFrame-list'])
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
    this.loaderService.showLoader('Deleting, please wait ').then(()=>{
      try{
        this.httpService.postApi(data, 'createPhotoFrame/updateDetails/' +data.id).subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            this.alertService.presentAlert('Success','Data deleted successfully','Okay');
            this.router.navigate(['/create-photo-frame-list'])
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
    localStorage.setItem('editData', JSON.stringify(data));
    this.router.navigate(['/create-photo-frame-edit'])
  }

  likeUsers(){
    this.action='liked';
    console.log("likedUser photo id",this.createPhotoFrame['_id'])
    this.loaderService.showLoader('Updating, please wait ').then(()=>{
      try{
        this.httpService.postApi({ videoFrameSurveyId: this.createPhotoFrame['_id']}, 'like/getByCondition').subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            console.log("get from likes",res)
            this.likedUsers = res['data']
           // this.alertService.presentAlert('Success','Success','Okay');
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
  
  commentedUsers(){
    this.action='comments';
    console.log("commented user photo id",this.createPhotoFrame['_id'])
    this.loaderService.showLoader('Updating, please wait ..').then(()=>{
      try{
        this.httpService.postApi({ videoFrameSurveyId: this.createPhotoFrame['_id']}, 'comment/getByCondition').subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            console.log("get from comments",res)
            this.commentUsers = res['data']
           // this.alertService.presentAlert('Success','Success','Okay');
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
    console.log("viewhistory photo id",this.createPhotoFrame['_id'])
    this.loaderService.showLoader('Updating Please wait ..').then(()=>{
      try{
        this.httpService.postApi({ videoFrameSurveyId: this.createPhotoFrame['_id']}, 'shares/getByCondition').subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            console.log("get from history",res)
            this.viewUsers = res['data']
           // this.alertService.presentAlert('Success','Success','Okay');
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

