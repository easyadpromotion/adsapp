import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoadingController, AlertController, MenuController, Platform } from '@ionic/angular';

import { UtilService } from 'src/app/util.service';
import { DataService } from '../data.service';
import { AlertService } from '../alert.service';
import { UserService } from '../user.service';
import { LoaderService } from '../loader.service';
import { FirebaseDbService } from '../firebase-db.service';


@Component({
  selector: 'app-get-passcode',
  templateUrl: './get-passcode.page.html',
  styleUrls: ['./get-passcode.page.scss'],
})
export class GetPasscodePage implements OnInit {
  loginForm: FormGroup;
  verifyData: any = {};
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService,
     public alertService: AlertService, 
     public menu:MenuController,
     public firebase:FirebaseDbService,
    public userService: UserService,public util:UtilService,
    public loaderService: LoaderService) { 
      
      if(localStorage.getItem('userData')===null){
        this.loaderService.hideLoader()
      }else{
        this.router.navigateByUrl('/home')
      }
    }

  ngOnInit() { this.loaderService.hideLoader();
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required]]
    });

  }


  ionViewWillEnter()
  {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required]]
    });
    if(localStorage.getItem('userData')===null){

    }else{
      this.router.navigateByUrl('/home')
    }
  }

  submit(data) {

    if (!this.loginForm.valid) {
			this.util.enableFromValidation(this.loginForm);
			return;
		}
    console.log(data)

    this.loaderService.showLoader('Logging in, please wait ').then(() => {
      try {
       let fb= this.firebase.getDb().collection('users', ref =>
              ref.where('phoneNumber', '==', data.username)
            ).snapshotChanges().subscribe(res=>{
              
            if(res.length){
              let firedata=res[0].payload.doc.data();
              this.loaderService.hideLoader()
              console.log(firedata)
              if(firedata['password']==data['password']){
                if(firedata['otpVerified']){
                    localStorage.setItem('userData', JSON.stringify(firedata));
                    fb.unsubscribe()
                    this.router.navigate(['/home'])
                }else{
                  this.alertService.presentAlert('Error','Please verify otp to proceed','Okay');
                  fb.unsubscribe()
                  this.router.navigate(['/verify-otp'])
                }
              }else{
                this.alertService.presentAlert('Error','Authenticated failure, Please enter valid credentials','Okay');
              }
            }else{
              this.loaderService.hideLoader()
              this.alertService.presentAlert('Error','User doesnot exist, Register first','Okay');
            }

        })
        // this.httpService.postApi(data, 'user/login').subscribe((res) => {
        //   this.loaderService.hideLoader();
        //   console.log(res)
        //   if (res["success"]) {
        //     this.loginForm.reset();
        //     if (!Array.isArray(res["data"]) || !res["data"].length || res["data"][0]["status"] == undefined) {
        //       this.alertService.presentAlert('Alert!', 'You dont have an account', 'Okay');
        //     }
        //     else if (res["data"].length > 0) {
        //       if(res['data'][0]['status']!='2'){
        //         localStorage.setItem('verifyData', JSON.stringify(res["data"]));
        //         this.httpService.postApi(data, 'user/updateOtpDetails/' + res['data'][0]._id).subscribe((res: any) => {
        //         this.router.navigate(['/verify-otp'])
        //         })
        //         return;
        //       }
        //       if (!res["invalid"]) {
        //         console.log("Password Correct")
               
        //         if (res["data"][0]["roleId"] == "Admin") {
                  
        //           if (res["data"][0]["status"] == 0) {
        //             this.alertService.presentAlert('Alert!', 'Your account has been blocked', 'Okay');
        //           }
        //           else{
        //             this.router.navigate(['/home'])
        //           }

        //         }
        //         else {
        //           if (res["data"][0]["status"] == 0) {
        //             this.alertService.presentAlert('Alert!', 'Your account has been blocked', 'Okay');
        //           }
                 
        //           else if (res["data"][0]["status"] == 2) {
        //            // this.alertService.presentAlert('Success', 'Successfully logged in', 'Okay');
        //             localStorage.setItem('userData', JSON.stringify(res["data"]));
        //             this.router.navigate(['/home'])
        //           }
        //         }
        //       }
        //       else{
        //         this.alertService.presentAlert('Error!', 'The password you have entered is incorrect', 'Okay');
        //       }
        //     }
        //   } else {
        //     this.alertService.presentAlert('Error', res["message"], 'Okay');
        //   }
        // }, (err) => {

        //   this.loaderService.hideLoader();
        //   this.alertService.presentNetworkAlert();
        // });
      } catch (e) {
        console.log(e)
        this.loaderService.hideLoader();
        this.alertService.presentAlert('Error', 'Something went wrong, please try again', 'Okay');
      }
    }) 

  }

}
