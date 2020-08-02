
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { HttpServiceService } from 'src/app/http-service.service';
  import { LoadingController, AlertController } from '@ionic/angular';
  import { AlertService } from 'src/app/alert.service';
  import { LoaderService } from 'src/app/loader.service';
  import { UserService } from 'src/app/user.service';
import { UtilService } from 'src/app/util.service';
import { FirebaseDbService } from 'src/app/firebase-db.service';
  
  @Component({
    selector: 'app-createVideo-details',
    templateUrl: './create-video-details.page.html',
    styleUrls: ['./create-video-details.page.scss'],
  })
  
  export class CreateVideoDetailsPage implements OnInit {
    createPhotoFrame;
    likedUsers:any=[]
    commentUsers:any=[]
    viewUsers:any=[]
    action="liked";
    users:any={};
  id;
  data={};
  constructor( private router:Router,public loadingCtrl: LoadingController,
    public httpService:HttpServiceService, public alertService:AlertService,
    public userService:UserService, public firebase:FirebaseDbService,
    public loaderService:LoaderService,public utilService:UtilService) {
    
  }

  ngOnInit() { this.loaderService.hideLoader();
    // this.loaderService.showLoader('Please wait').then(()=>{
     
    
  }

  ionViewWillEnter(){
    this.data = JSON.parse(localStorage.getItem('createVideoDetails'))
    let user=this.firebase.readData('users').subscribe(userData=>{
      userData.forEach(item=>{
        let data=item.payload.doc.data();
        this.users[item.payload.doc.id]=data;
      });
      user.unsubscribe();
        
      let fb=this.firebase.getDb().collection('likes', ref =>
        ref.where('videoFrameSurveyId', '==', this.data['id'])
      ).snapshotChanges().subscribe(res=>{
        res.forEach(item=>{
          let data=item.payload.doc.data();
          this.likedUsers.push(data)
        })
        fb.unsubscribe();
        console.log(res)
      })

      let comments=this.firebase.getDb().collection('comments', ref =>
        ref.where('videoFrameSurveyId', '==', this.data['id'])
      ).snapshotChanges().subscribe(res=>{
        res.forEach(item=>{
          let data=item.payload.doc.data();
          this.commentUsers.push(data)
        })
        comments.unsubscribe();
        console.log(res)
      })

      let shares=this.firebase.getDb().collection('shares', ref =>
        ref.where('videoFrameSurveyId', '==', this.data['id'])
      ).snapshotChanges().subscribe(res=>{
        res.forEach(item=>{
          let data=item.payload.doc.data();
          this.viewUsers.push(data)
        })
        shares.unsubscribe();
        console.log(res)
      })

    });
   
  }

  
  edit(data) {
    console.log(data)
    localStorage.setItem('editData', JSON.stringify(this.data));
    this.router.navigate(['/create-video-edit'])
  }

  likeUsers(){
    this.action='liked';
    console.log("likedUser photo id",this.createPhotoFrame['_id'])
 
  }
  
  commentedUsers(){
    this.action='comments';
    console.log("commented user photo id",this.createPhotoFrame['_id'])
   
  }

  viewHistory(){
    this.action='views';
    console.log("viewhistory photo id",this.createPhotoFrame['_id'])
   
  }


 
  

}



  
  