import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/alert.service';
import { LoaderService } from 'src/app/loader.service';
import { UserService } from 'src/app/user.service';
import { UtilService } from 'src/app/util.service';
import { FirebaseDbService } from '../firebase-db.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOtpPage implements OnInit {
  otpSend = true;
  timer = 0;
  minutes = 0;
  otp = 0;
  open = false;
  mobileNo
  localData
  numArray:any=[]
 data:any={}
  numArray1:any=[]
  propertyArray:any={};
  disableButton=false;
  newnum;
  verifyOtpForm: FormGroup;
  registeredUser={};
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public userService: UserService,public util:UtilService,
    public firebase:FirebaseDbService,
    public loaderService: LoaderService) { }

  ngOnInit() { this.loaderService.hideLoader();
    this.verifyOtpForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      otpVerified: ['-', [Validators.required]],
      _id: ['-', [Validators.required]],
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      isUser: ['1', [Validators.required]]

    });

    
    
  }


 

ionViewWillEnter()
{
  this.localData = JSON.parse(localStorage.getItem('verifyData'));
  this.newnum=JSON.parse(localStorage.getItem('changedNumber'));

      this.verifyOtpForm.patchValue({phoneNumber:this.localData.phoneNumber,_id:this.localData._id})
      console.log(this.localData);
      this.registeredUser=JSON.parse(localStorage.getItem('verifyData'));

  
    let subscribe=this.firebase.getDb().collection('users', ref =>
      ref.where('phoneNumber', '==', this.registeredUser['phoneNumber'])
    ).snapshotChanges().subscribe(res=>{
      // console.log(res[0].payload.doc.id);
      // console.log(res[0].payload.doc.data())
      this.registeredUser=res[0].payload.doc.data();
      this.httpService.smsApi(this.registeredUser['phoneNumber'],this.registeredUser['otp']);
      subscribe.unsubscribe();
    })
}

//resendOtp
resendOtp()
{
  console.log("resending otp")
  this.httpService.smsApi(this.registeredUser['phoneNumber'],this.registeredUser['otp']);
  
}


  numbesubmit(data1)
  {
    this.numArray.push(data1)
    //to remove commas using join
    this.numArray1=this.numArray.join(""); 
    
    if(this.numArray.length==4)
    {
      this.loaderService.showLoader('verification in progress');
      this.disableButton=true;
      if(this.registeredUser['otp']==this.numArray1){
        this.registeredUser['status']=2;
        this.registeredUser['otpVerified']=true;
        this.firebase.updateData('users',this.registeredUser['phoneNumber']+"",this.registeredUser).then(res=>{
          console.log(res)
          this.loaderService.hideLoader();
          this.router.navigateByUrl('/get-passcode')
        }).catch(err=>{
          console.log(err)
          this.loaderService.hideLoader();
          this.alertService.presentAlert('Error','Unable to proceed verification','Okay')
        })
      }else{
        this.alertService.presentAlert('Error','Otp entered was invalid, Please check again','Okay');
      }

    }



  }


  previous()
  {
    console.log(this.propertyArray);
   // this.numArray.push(this.propertyArray['value'])
    //this.numArray.splice(this.numArray.indexOf(this.propertyArray), 1)
    this.numArray.pop();
    if(this.numArray.length<4)
    {
      this.disableButton=false;
    }
   console.log(typeof(this.numArray))
  
  }

  clear()
  {
    this.numArray=Array();
    //this.numArray=" ";
    this.disableButton=false; 
  }
}
