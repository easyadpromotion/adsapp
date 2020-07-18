import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { LoadingController } from '@ionic/angular';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoaderService } from 'src/app/loader.service';
import { UtilService } from 'src/app/util.service';
import { FirebaseDbService } from '../firebase-db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  states: any = [];
  cities: any = [];
  educationQualifications: any = [];
  roles: any = ["Franchise", "Vendor", "User", "Admin"];
  professions:any=["Student","Employee","Unemployed","Housewife","Retired","Business","Others"];
  registrationForm: FormGroup;
  loading;
  gender: any = [];
  registeredUsers=[];
 
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public firebase:FirebaseDbService,
    public loaderService: LoaderService,public util:UtilService) { }

  ngOnInit() { this.loaderService.hideLoader();
        
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]],
      emailAddress: ['',[Validators.pattern(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ]],
      gender: ['', [Validators.required]],
      educationQualification: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      roleId: ['User', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      walletAmount: ['0', [Validators.required]],
      status: ['0', [Validators.required]],
      profilePic:[''],
      profession:['',[Validators.required]],
    });
  
    //gender API
    this.httpService.getApi('gender').subscribe((res: any) => {
      console.log(res)
      this.gender = res
    })


    //get education Qualifications api
    this.httpService.getApi('educationQualifications').subscribe((res: any) => {
      console.log(res)
      this.educationQualifications = res
    })
    
    //get registered users
    
  }

  ionViewWillEnter(){
    let fb=this.firebase.getDb().collection('users', ref =>
      ref.where('roleId', '==', 'User')
    ).snapshotChanges().subscribe(res=>{
      this.registeredUsers=res;
      fb.unsubscribe();
      console.log(res)
    })
  }



  generateOTP() { 
          
    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
  } 

  submit(data) {
    if (!this.registrationForm.valid) {
      this.util.enableFromValidation(this.registrationForm);
     return;
   }
   this.loaderService.showLoader('registering');
   
    let flag=0;
    this.registeredUsers.forEach(res=>{
      let firedata=(res.payload.doc.data())
      if(firedata['emailAddress']==data['emailAddress'] || 
      firedata['phoneNumber']==data['phoneNumber']){
        flag=1;
      }
    })
    setTimeout(()=>{
      if(flag){
        this.loaderService.hideLoader()
        this.alertService.presentAlert('Error','Email Address / Phone Number is already exist','Okay');
      }else{
        data['otp'] = this.generateOTP();
        data['otpVerified'] = false;
        this.firebase.addDataWithId('users',data['phoneNumber']+"",data).then(res=>{
          this.loaderService.hideLoader();
          console.log(res);
          localStorage.setItem('verifyData', JSON.stringify(data));
          this.router.navigate(['/verify-otp'])
        }).catch(err=>{
          console.log(err)
          this.loaderService.hideLoader()
          this.alertService.presentAlert('Error','Unable to register user, please try again','Okay');
        })
      }
    })
   

    
    
  }



  //image upload function
  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.loaderService.showLoader('Uploading photo, please wait ..').then(() => {
        try {
          this.httpService.upload(formData, 'api/uploadImage').subscribe(res => {
            this.loaderService.hideLoader();
            console.log(res)
            this.registrationForm.patchValue({
              profilePic: res.file
            }) 
          }, (err) => {

            this.loaderService.hideLoader();
            this.alertService.presentNetworkAlert();
          });
        } catch (e) {
          this.loaderService.hideLoader();
          this.alertService.presentAlert('Error', 'Something went wrong, please try again', 'Okay');
        }
      })

  

    }
  }



}
