import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/util.service';
import { UserService } from 'src/app/user.service';
import { LoaderService } from 'src/app/loader.service';
import { HttpServiceService } from 'src/app/http-service.service';
import { AlertService } from 'src/app/alert.service';
import { Router } from '@angular/router';
import { FirebaseDbService } from 'src/app/firebase-db.service';


@Component({
  selector: 'app-surveyad-detail',
  templateUrl: './surveyad-detail.page.html',
  styleUrls: ['./surveyad-detail.page.scss'],
})
export class SurveyadDetailPage implements OnInit {

  newAmt
  refUserAmout
  answer="";
  data;
  questions=[];
  index=0;
  liked=false;
  wallet:any={}
  ended=false;
  alreadyEarned=false;

  constructor(public utilService:UtilService,public userService:UserService,
    public loaderService:LoaderService,public httpService:HttpServiceService,public alertService:AlertService,
    public router:Router,public firebase:FirebaseDbService) { }

  ngOnInit() { this.loaderService.hideLoader();
    this.data=JSON.parse(localStorage.getItem('surveyDetails'));
    this.questions=this.data['questions'];
    console.log(this.questions)
  }

  ionViewWillEnter()
  {
    this.data=JSON.parse(localStorage.getItem('surveyDetails'));
    this.questions=this.data['questions'];
    console.log(this.questions)
  }


  nextQuestion(){
    if(this.index<this.questions.length-1){
      this.questions[this.index]=this.answer;
      this.index++;
    }else{
      this.questions[this.index]['answer']=this.answer;
      console.log(this.questions)
      let json ={
        surveyId:this.data._id,
        userId:this.userService.getUserId(),
        answer:this.answer,
        json:this.questions,
        createdAt:new Date().getTime()
      }
      console.log('nrea',this.data)
     // this.loaderService.showLoader('Adding, please wait').then(()=>{
        if(this.data.users.indexOf(this.userService.getUserId())==-1)
        {
          alert(1)
          this.data.users.push(this.userService.getUserId());
          this.data.targetReached=this.data.users.length;
          this.firebase.updateData('surveyads',this.data['id'],this.data);
          this.addMoney();
          this.addView();
          this.router.navigateByUrl('/surveyads');
        }else{
          this.router.navigateByUrl('/surveyads');
        }
     

    
    }
  }

  addMoney(){
    this.firebase.readData('amountConfig').subscribe(res=>{
      let item=res[0];
      let amountConfig=item.payload.doc.data();
      let json={}
      json['userId']=this.userService.getUserId();
      json['transactionType']="credit";
      json['videoFrameSurveyId']=this.data["id"];
      json['type']='Survey';
      let amountCal=this.data['amountPaid']/this.data['targetCount'];
      json['amount']= (amountCal*amountConfig['user'])/100;
      json['status']=1;
      this.firebase.addData('transactions',json);
      this.userService.updateWallet((amountCal*amountConfig['user'])/100);
    })
    
  }

  addView(){
    
    let data:any ={}
    data['userId']=this.userService.getUserId();
    data['type']= 'Survey';
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
        this.firebase.updateData('videoads',this.data['id'],this.data);
        this.alreadyEarned=true;
        
      }
  }
  
  // addViewHistory(){
  //   let data:any ={}
  //   data['userId']=this.userService.getUserId();
  //   data['videoFrameSurveyId']= this.data["_id"];
  //   data['type']='Survey';
  //   data['earned']='1';
  //   data['isAvailable']='1';
  //   this.history.createViewHistory(data);
  //   if(this.ended){ 
  //     this.router.navigateByUrl('/survey-list')
  //    }
  // }
  // addLike(){
  //   let data:any ={}
  //   data['userId']=this.userService.getUserId() ;
  //   data['type']= 'Survey';
  //   data['likedOrNot']= true;
  //   data['videoFrameSurveyId']= this.data["_id"];
  //   data['isAvailable']= '1';
  //   this.likeService.likesAdd(data)  
     
  //   this.liked=true;
  // }


  // addMoney(){
  //  // if(this.ended){
  //       console.log("wallet service",this.userService.getUserId())
  //       this.wallet['userId']=this.userService.getUserId();
  //       this.wallet['creditDebit']='1';
  //       this.wallet['videoFrameSurveyId']=this.data["_id"];
  //       this.wallet['type']='Survey';
  //       this.wallet['amount']= this.data['amount']/this.data['targetCount'];
  //       this.wallet['status']='1';
  //       this.wallet['isAvailable']='1';
  //       this.walletService.walletUpdateCredit(this.wallet)
        
  //     this.router.navigateByUrl('/survey-list')
  //   // }else{
  //   //   this.router.navigateByUrl('/survey-list')
  //   // }
  // }



  // addRemainingAmount()
  // {
  //   let userData = JSON.parse(localStorage.getItem('userData'))//get loggedIn user data
  //    console.log("userData",userData[0].referralCode)
  //    console.log("pa",this.data["paymentAmount"])
  //       console.log("a",this.data["amount"])
       
  //       this.newAmt=(this.data["paymentAmount"])-(this.data["amount"]);
  //       console.log("na",this.newAmt)
  //       this.httpService.postApi({myReferralCode:userData[0].referralCode},'user/getByCondition').subscribe((res: any) => {
  //         localStorage.setItem('myrefData', JSON.stringify(res["data"]));
  //         console.log("refUserData",res)
  //         if((res.data.length) && ((res.data[0]['myReferralCode'])==(userData[0].referralCode)) && (userData[0].referralCode)) //if referal code exists
  //         {
  //           console.log("if part is executing")
  //           this.refUserAmout=(this.newAmt)*(60/100)
  //           this.wallet['userId']=res.data[0]['_id']
  //               this.wallet['creditDebit']='1';
  //               this.wallet['videoFrameSurveyId']=this.data["_id"];
  //               this.wallet['type']='Video';
  //               this.wallet['amount']= this.refUserAmout/this.data['targetCount'];
  //               this.wallet['status']='1';
  //               this.wallet['isAvailable']='1';
  //               this.walletService.walletUpdateCreditByRefCode(this.wallet)
  //               //also update admin wallet history
  //               this.httpService.postApi({roleId:'Admin'},'user/getByCondition').subscribe((res: any) => {
  //                 console.log("AdminData",res.data)
  //                 localStorage.setItem('AdminData', JSON.stringify(res["data"]));
  //                   console.log("if admin")
  //                   this.wallet['userId']=res.data[0]['_id']
  //                   this.wallet['creditDebit']='1';
  //                   this.wallet['videoFrameSurveyId']=this.data["_id"];
  //                   this.wallet['type']='Video';
  //                   this.wallet['amount']= ((this.newAmt)-(this.refUserAmout))/this.data['targetCount'];
  //                   this.wallet['status']='1';
  //                   this.wallet['isAvailable']='1';
  //                   this.walletService.walletUpdateCredittoAdmin(this.wallet)
                    
                 
               
  //               })
  //         }

  //         else
  //         {
  //           console.log("else part is executing")
  //           this.httpService.postApi({roleId:'Admin'},'user/getByCondition').subscribe((res: any) => {
  //             console.log("AdminData",res.data)
  //             localStorage.setItem('AdminData', JSON.stringify(res["data"]));
  //               //console.log("wallet service",this.userService.getUserId())
  //               this.wallet['userId']=res.data[0]['_id']
  //               this.wallet['creditDebit']='1';
  //               this.wallet['videoFrameSurveyId']=this.data["_id"];
  //               this.wallet['type']='Video';
  //               this.wallet['amount']= this.newAmt/this.data['targetCount'];
  //               this.wallet['status']='1';
  //               this.wallet['isAvailable']='1';
  //               this.walletService.walletUpdateCredittoAdmin(this.wallet)
                
             
           
  //           })
  //         }
  //         })
    

  // }

}
