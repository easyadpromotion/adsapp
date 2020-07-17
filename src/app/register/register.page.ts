import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { LoadingController } from '@ionic/angular';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoaderService } from 'src/app/loader.service';
import { UtilService } from 'src/app/util.service';

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
 
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
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
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      //otpVerified: ['', [Validators.required]],
      roleId: ['User', [Validators.required]],
      password: ['', [Validators.required],Validators.minLength(6)],
      //otp: ['', [Validators.required,false]],
      walletAmount: ['0', [Validators.required]],
      contactName: ['-', [Validators.required]],
      contactPhoneNumber: ['-', [Validators.required]],
      status: ['1', [Validators.required]],
      businessType: ['-', [Validators.required]],
      businessPhotos: ['-', [Validators.required]],
      gpsAddress: ['-', [Validators.required]],
      franchiseId: ['-', [Validators.required]],
      isFranchise: ['0', [Validators.required]],
      isAvailable: ['1', [Validators.required]],
      isUser: ['1', [Validators.required]],
      referralCode:[''],
      profilePic:[''],
      upiAddress: [''],
      myReferralCode:[this.refCode(6),[Validators.required]],
      profession:['',[Validators.required]],
    });



    //get state api
    this.httpService.getApi('state/getAll').subscribe((res: any) => {
      console.log(res)
      this.states = res.data
    })
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

    //get roles api
    //this.httpService.getApi('roles/getAll').subscribe((res: any) => {
    // console.log(res)
    // this.roles= res
    //   })     
  }



  ionViewWillEnter()
  {
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
      state: ['-', [Validators.required]],
      city: ['-', [Validators.required]],
     // address: ['', [Validators.required]],
      //otpVerified: ['', [Validators.required]],
      roleId: ['User', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      //otp: ['', [Validators.required,false]],
      walletAmount: ['0', [Validators.required]],
      contactName: ['-', [Validators.required]],
      contactPhoneNumber: ['-', [Validators.required]],
      status: ['1', [Validators.required]],
      businessType: ['-', [Validators.required]],
      businessPhotos: ['-', [Validators.required]],
      upiAddress: [''],
      gpsAddress: ['-', [Validators.required]],
      franchiseId: ['-', [Validators.required]],
      isFranchise: ['0', [Validators.required]],
      isAvailable: ['1', [Validators.required]],
      isUser: ['1', [Validators.required]],
      referralCode:[''],
      profilePic:[''],
      myReferralCode:[this.refCode(6),[Validators.required]],
      profession:['',[Validators.required]],
    });



    //get state api
    this.httpService.getApi('state/getAll').subscribe((res: any) => {
      console.log(res)
      this.states = res.data
    })
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

    //get roles api
    //this.httpService.getApi('roles/getAll').subscribe((res: any) => {
    // console.log(res)
    // this.roles= res
    //   }) 
  }

getCities(){
      //get city api
      this.httpService.postApi({stateId:this.registrationForm.value.state},'city/getByCondition').subscribe((res: any) => {
        console.log(res)
        this.cities = res.data
        console.log(res.data)
      })
}
  submit(data) {
    data['phoneNumber'] += "";
    if (!this.registrationForm.valid) {
     
      console.log(data)
			this.util.enableFromValidation(this.registrationForm);
			return;
		}


    data['otp'] = " "
    data['otpVerified'] = " ";
    
    this.httpService.getApi('user/getAll').subscribe((res: any) => {
    
      let val = res.data;
     var count=0;
for (let i = 0; i < val.length; i++) {
  
  if(val[i]['phoneNumber']==this.registrationForm.value.phoneNumber )
  {
   
    this.alertService.presentAlert('Success', 'Phone Number already exists', 'Okay');
    console.log("matched");
    count=1;
   break;
  }
  
}

if(count==0)
{
  console.log("not");
  this.loaderService.showLoader('Adding your data, please wait ..').then(() => {
      try {
        this.httpService.postApi(data, 'user/create').subscribe((res) => {
          this.loaderService.hideLoader();
          console.log(res)
          if (res["success"]) {
            this.alertService.presentAlert('Success', 'OTP has been sent to your mobile', 'Okay');
            localStorage.setItem('verifyData', JSON.stringify(res["data"]));
           
            this.router.navigate(['/verify-otp'])
          } else {
            this.alertService.presentAlert('Error', res["message"], 'Okay');
          }
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


// refCode()
// {
//  return this.randomize('A', 6);
//  // console.log( this.randomize('A', 6));
 
// }

refCode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log(result)
  return result;
  
}

}
