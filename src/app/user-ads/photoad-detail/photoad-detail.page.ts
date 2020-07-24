import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { UserService } from 'src/app/user.service';
import { LoaderService } from 'src/app/loader.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FirebaseDbService } from 'src/app/firebase-db.service';
import { AlertService } from 'src/app/alert.service';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-photoad-detail',
  templateUrl: './photoad-detail.page.html',
  styleUrls: ['./photoad-detail.page.scss'],
})
export class PhotoadDetailPage implements OnInit {
  data={};
  showComment=false;
  alreadyEarned=false;
  liked=false;
  shared=false;
  comment='';

  constructor(public router:Router,public httpService:HttpServiceService,public userService:UserService,
    public loaderService:LoaderService, public alertService:AlertService,
    public firebase:FirebaseDbService, public utilService:UtilService,
    private socialSharing: SocialSharing,
    ) {
      
  }

  ngOnInit() {
    this.data=JSON.parse(localStorage.getItem('photoDetails'));
  }

  ionViewWillEnter(){
    this.data=JSON.parse(localStorage.getItem('photoDetails'));
    if(this.data){
      if(this.data['users'].indexOf(this.userService.getUserId())>-1){
        this.alreadyEarned=true;
      }
    }
    this.loaderService.hideLoader();
    this.addView(); 
    let fb=this.firebase.getDb().collection('likes', ref =>
      ref.where('videoFrameSurveyId', '==', this.data['id'])
    ).snapshotChanges().subscribe(res=>{
      res.forEach(item=>{
        let data=item.payload.doc.data();
        if(data['userId']==this.userService.getUserId()){
          this.liked=true;
        }
      })
      fb.unsubscribe();
      console.log(res)
    })
    
  }

  openComment(){
    this.showComment=!this.showComment
  }

  getSplittedname(url){
    let n=url.split('/');
    return n[n.length-1];
  }

  addLike(){
    let data:any ={}
    data['userId']=this.userService.getUserId();
    data['type']= 'photo';
    data['liked']=true;
    data['videoFrameSurveyId']= this.data["id"];
    data['createdAt']=new Date().toISOString()
    this.firebase.addData('likes',data);
    this.liked=true;
    if(this.data['users'].indexOf(this.userService.getUserId())==-1 && this.data['mode']=='like')
      {
        
        this.liked=true;
        this.data['users'].push(this.userService.getUserId());
        this.data['targetReached']=this.data['users'].length;
        this.addMoney();
        this.firebase.updateData('photoads',this.data['id'],this.data);
        this.alreadyEarned=true;
        
      }
  }

  share(){
    this.loaderService.showLoader('')
    let data:any ={}
    data['userId']=this.userService.getUserId();
    data['type']= 'photo';
    data['share']=true;
    data['videoFrameSurveyId']= this.data["id"];
    data['createdAt']=new Date().toISOString()
    this.firebase.addData('shares',data);
    this.shared=true;
    this.socialSharing.shareWithOptions({
      message:'Hey Im promoting my add in EAP App',
      subject:this.data['name'],
      files:[this.httpService.imageUrl+this.getSplittedname(this.data['photoFrameUrl'])],
      url:this.httpService.imageUrl+this.getSplittedname(this.data['photoFrameUrl'])
    })
    if(this.data['users'].indexOf(this.userService.getUserId())==-1 && this.data['mode']=='share')
      {
        this.data['users'].push(this.userService.getUserId());
        this.addMoney();
        this.data['targetReached']=this.data['users'].length;
        this.firebase.updateData('photoads',this.data['id'],this.data);
        this.alreadyEarned=true;
        
      }
      
      this.loaderService.hideLoader();
  }

  addView(){
    
    let data:any ={}
    data['userId']=this.userService.getUserId();
    data['type']= 'photo';
    data['view']=true;
    data['videoFrameSurveyId']= this.data["id"];
    data['createdAt']=new Date().toISOString()
    this.firebase.addData('views',data);

    if(this.data['users'].indexOf(this.userService.getUserId())==-1 && this.data['mode']=='view')
      {
        console.error(this.data)
        this.data['users'].push(this.userService.getUserId());
        this.addMoney();
        this.data['targetReached']=this.data['users'].length;
        this.firebase.updateData('photoads',this.data['id'],this.data);
        this.alreadyEarned=true;
        
      }
  }

  addComment(){
    let data:any ={}
    data['userId']=this.userService.getUserId() ;
    data['type']= 'photo';
    data['commentMessage']= this.comment ;
    data['videoFrameSurveyId']= this.data["id"];
    data['createdAt']=new Date().toISOString()
    this.firebase.addData('comments',data);
    this.showComment=false;
    this.alertService.presentAlert('Success','Thanks for submitting comment','Okay')
  }

  addMoney(){
    this.firebase.readData('amountConfig').subscribe(res=>{
      let item=res[0];
      let amountConfig=item.payload.doc.data();
      let json={}
      json['userId']=this.userService.getUserId();
      json['transactionType']="credit";
      json['videoFrameSurveyId']=this.data["id"];
      json['type']='photo';
      let amountCal=this.data['amountPaid']/this.data['targetCount'];
      json['amount']= (amountCal*amountConfig['user'])/100;
      json['status']=1;
      this.firebase.addData('transactions',json);
      this.userService.updateWallet((amountCal*amountConfig['user'])/100);
    })
    
  }
  

}
