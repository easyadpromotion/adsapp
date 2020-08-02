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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  otpSend = false;
  otpVerify=false;
  timer = 0;
  minutes = 0;
  otp = '';
  open='false';
  opens='false';
  numberOpen='true';
  localData;
  error="";
  verified=false;
  forgotPasswordForm:FormGroup;
  
  constructor(private formBuilder:FormBuilder, private router:Router,public loadingCtrl: LoadingController,
    public httpService:HttpServiceService, public alertService:AlertService,
    public userService:UserService,public util:UtilService, public firebase:FirebaseDbService,
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
  
  }

  removeError(){
    this.error="";
  }

  ngOnDestroy(){
    this.otpSend=true;
    this.removeError();
    this.open='';
  }
  
  
  sendOtp(data){
   
  
   this.error="";
   

   this.loaderService.showLoader('Logging in, please wait ').then(() => {
    try {
     let fb= this.firebase.getDb().collection('users', ref =>
            ref.where('phoneNumber', '==', data.phoneNumber)
          ).snapshotChanges().subscribe(res=>{
            console.log({res})
            this.loaderService.hideLoader();
          if(res.length){
            let firedata=res[0].payload.doc.data();
            this.otp=this.util.generateSMSOTP();
            this.httpService.smsApi(data.phoneNumber,this.otp);
            this.firebase.updateData('users',data.phoneNumber+"",{otp:this.otp});
            this.open='true';
            this.otpSend=true;
            
          }else{
              this.error="Cannot find your account";
              this.forgotPasswordForm.reset();
              this.alertService.presentAlert('Error','',this.error);
          }
          fb.unsubscribe();
        });
    }catch(e){

    }   
  });

   
  }



  verifyOtp(data){
   
    if(data.otp==this.otp)
    {
      this.opens = 'true';
      this.open='false';
      this.numberOpen='false';
      this.otpVerify=true;
      this.verified=true;
    }
    else{
      this.alertService.presentAlert('Error','Wrong OTP is entered','Okay');
    }
  }

  submit(data)
  {
    if(data.password==data.confirmPassword)
    {
      this.firebase.updateData('users',data['phoneNumber']+"",{password:data.password}).then(()=>{
        this.loaderService.hideLoader();
        this.alertService.presentAlert('Success','Password got updated successfully','Okay')
        this.router.navigateByUrl('/login')
      })
    }
  }
 

}
