import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpServiceService } from '../http-service.service';
import { AlertService } from '../alert.service';
import { UserService } from '../user.service';
import { UtilService } from '../util.service';
import { LoaderService } from '../loader.service';
import { FirebaseDbService } from '../firebase-db.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  states:any=[];
  cities:any=[];
  educationQualifications:any=[];
  roles:any=["Franchise","vendor","User","Admin"];
  gender: any = [];
   updateProfile: FormGroup;
   profilePic;
  editDetails;
  constructor(private formBuilder:FormBuilder, private router:Router,public loadingCtrl: LoadingController,
    public httpService:HttpServiceService, public alertService:AlertService,
    public userService:UserService,public util:UtilService,
    public firebase:FirebaseDbService,
    public loaderService:LoaderService) { }

  ngOnInit() { this.loaderService.hideLoader();
    this.updateProfile = this.formBuilder.group({
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
      profession:['',[Validators.required]]    
    });

            
          
        
         //gender API
    this.httpService.getApi('gender').subscribe((res: any) => {
      console.log(res)
      this.gender = res
    })
              //get city api
            this.httpService.getApi('city/getAll').subscribe((res: any) => {
              console.log(res)
              this.cities= res.data
                        })
              //get education Qualifications api
            this.httpService.getApi('educationQualifications').subscribe((res: any) => {
              console.log(res)
              this.educationQualifications= res
                        })  

   
    
    this.editDetails = JSON.parse(localStorage.getItem('userDetails'))
    console.log(this.editDetails)
    this.updateProfile.patchValue(this.editDetails);
    this.profilePic=this.getSplittedname(this.editDetails['profilePic'])
  
  }


  ionViewWillEnter()
  {
    
    
    this.editDetails = JSON.parse(localStorage.getItem('userDetails'))
    console.log(this.editDetails)
    this.updateProfile.patchValue(this.editDetails);
    this.profilePic=this.getSplittedname(this.editDetails['profilePic'])
    console.log(" this.profilePic", this.profilePic)
   // this.loaderService.hideLoader();
  }

  
  // getCities(){
  //   //get city api
  //   this.httpService.postApi({stateId:this.updateProfile.value.state},'city/getByCondition').subscribe((res: any) => {
  //     console.log(res)
  //     this.cities = res.data
  //     console.log(res.data)
  //   })
  // }



  submit(data) {

    if (!this.updateProfile.valid) {
      this.util.enableFromValidation(this.updateProfile);
      console.log(data)
			return;
    }

    // console.log({data})
    // return;
    
    data['updatedAt']=new Date().getTime();
    localStorage.setItem('userDetails',JSON.stringify(data));
    this.userService.updateUser(data);
    this.router.navigateByUrl('/home');
    
  }

  getSplittedname(url){
    console.log(url)
    let n=url.replace('public/','');
    return n;
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.loaderService.showLoader('Uploading Photo Please wait ..').then(() => {
        try {
          this.httpService.upload(formData, 'api/uploadImage').subscribe(res => {
            this.loaderService.hideLoader();
            console.log(res)
            this.updateProfile.patchValue({
              profilePic: res.file
            }) 
            this.profilePic=this.getSplittedname(res.file)
          }, (err) => {
  
            this.loaderService.hideLoader();
            this.alertService.presentNetworkAlert();
          });
        } catch (e) {
          this.loaderService.hideLoader();
          this.alertService.presentAlert('Error', 'Something went wrong please try again', 'Okay');
        }
      })
  
   
  
    }
  }
}
