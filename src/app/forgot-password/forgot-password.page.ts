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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  otpSend = true;
  otpVerify=true;
  timer = 0;
  minutes = 0;
  otp = 0;
  open='false';
  opens='false';
  numberOpen='true';
  localData;
  error="";
  forgotPasswordForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private router:Router,public loadingCtrl: LoadingController,
    public httpService:HttpServiceService, public alertService:AlertService,
    public userService:UserService,public util:UtilService,
    public loaderService:LoaderService) { }

  ngOnInit() { this.loaderService.hideLoader();
    this.forgotPasswordForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      otpVerified: ['-', [Validators.required]],
      id: ['-', [Validators.required]],
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      password:['', [Validators.required,Validators.minLength(6)]],
      confirmPassword:['', [Validators.required,,Validators.minLength(6)]]
     

    });
    
  }


  ionViewWillEnter()
  {
    // this.forgotPasswordForm = this.formBuilder.group({
    //   phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    //   otpVerified: ['-', [Validators.required]],
    //   id: ['-', [Validators.required]],
    //   otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    //   password:['', [Validators.required]],
    //   confirmPassword:['', [Validators.required]]
     

    // });

  }

  removeError(){
    this.error="";
    this.otpSend=true;
  }

  ngOnDestroy(){
    this.otpSend=true;
    this.removeError();
    this.open='';
  }
  
  //data['phoneNumber']=this.forgotPasswordForm.value.phoneNumber;
  sendOtp(data){
   
console.log(data)
   this.otpSend=true;
   this.error="";
    this.httpService.postApi({phoneNumber:data['phoneNumber']},'user/getByCondition').subscribe((res: any) => {
     console.log(res.data);
    
     if(!res.data.length){
       this.error="Cannot find your account";
       this.forgotPasswordForm.reset();
      // return;
       this.otpSend=true;
     }
     data['otp']='';
     data['_id']=res.data[0]._id;
     data['password']=res.data[0].password
      if(res.data[0].phoneNumber)
      {
     
          this.httpService.postApi(data,'user/updateOtpDetails/' + data._id).subscribe((res: any) => {
            console.log(res);
            if(res.success){
              this.open = 'true';
              console.log(this.open); 
                console.log("send otp");
             }
             else{
              this.alertService.presentAlert('Error',res["message"],'Okay');
             }
            })
          }
      else{
        console.log("entered mobile number doesnot exist");
      }
    })
    this.otpSend = false;
    this.otpVerify = true;
   
  }



  verifyOtp(data){
   
    //data['id']="5ea80baf729f5d60a56550f0";
    data['phoneNumber']=this.forgotPasswordForm.value.phoneNumber;
    this.httpService.postApi({phoneNumber:data['phoneNumber']},'user/getByCondition').subscribe((res: any) => {
      localStorage.setItem('verifyotp', JSON.stringify(res["data"]));
     // console.log(res["data"])
      if(res.data[0].otp==this.forgotPasswordForm.value.otp)
      {
        
        this.opens = 'true';
        this.open='false';
        this.numberOpen='false';
       // this.otpSend=false;
        console.log(this.opens);
        this.otpVerify = false;
         // console.log("send otp");
      }
      else{
        console.log("otp entered is wrong");
        this.alertService.presentAlert('Error','Wrong OTP is entered','Okay');
        this.otpVerify =true;
      }
    })
    this.otpVerify = false;
  }

  submit(data)
  {
    this.localData = JSON.parse(localStorage.getItem('verifyData'))
    data['phoneNumber']=this.forgotPasswordForm.value.phoneNumber;
    console.log("localData",this.localData);
    this.httpService.postApi({phoneNumber: data['phoneNumber']},'user/getByCondition').subscribe((res: any) => {
     console.log(res.data[0]._id);
    
     data['id']=res.data[0]._id;
    
    if(data.password==data.confirmPassword)
    {
      console.log("passwords matched");
      this.httpService.postApi({_id:data['id'],password:this.forgotPasswordForm.value.password}, 'user/updateDetails/' + data.id).subscribe((res: any) => {
        this.loaderService.hideLoader();
        if (res["success"]) {
          this.alertService.presentAlert('Success','Password changed Successfully','Okay');
          this.router.navigate(['/login'])
       
        } else {
          this.alertService.presentAlert('Error',res["message"],'Okay');
        }
      },(err)=>{
        
        this.loaderService.hideLoader();
        this.alertService.presentNetworkAlert();
       });
    }
  })
  }
 

}
