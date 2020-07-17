
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/alert.service';
import { LoaderService } from 'src/app/loader.service';
import { UserService } from 'src/app/user.service';
import { UtilService } from 'src/app/util.service';
import * as moment from 'moment';
import { google } from "google-maps";

declare var google : google;
@Component({
  selector: 'app-createPhotoFrame-edit',
  templateUrl: './create-photo-frame-edit.page.html',
  styleUrls: ['./create-photo-frame-edit.page.scss'],
})
export class CreatePhotoFrameEditPage implements OnInit {
  totalAmount
  GoogleAutocomplete: google.maps.places.AutocompleteService;
autocomplete: { input: string; };
autocompleteItems: any[];
location: any;
placeid: any;

// maps end 

  createPhotoFrameForm: FormGroup;
  loading;
  types: any = [];
  frames = [];
  ages=[
    {name:'20-30'},
    {name:'30-40'},
    {name:'40-50'},
    {name:'50-60'}
  ]
  gender=[
    {name:'Male'},
    {name:'Female'},
    {name:'Other'},
  ]
  dropdownSettings = {
    singleSelection: false,
    idField: 'name',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    enableCheckAll:true,
    allowSearchFilter: false,
    closeDropDownOnSelection:true
  }

  imageFrames:any =[];
  photoResponse
  Pamount1;
  myDate=[]

  startDate
  endDate
  m
  n
  newdate
  editDetails
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public userService: UserService,
    public loaderService: LoaderService, public utilService: UtilService,public util:UtilService,
    public zone: NgZone) { 
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  this.autocomplete = { input: '' };
  this.autocompleteItems = [];

    }

    

    updateSearchResults(){
      if (this.autocomplete.input == '') {
        this.autocompleteItems = [];
        return;
      }
      this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
            console.log(prediction)
          });
        });
      });
    }
    selectSearchResult(item) {
      this.location = item;
      this.createPhotoFrameForm.patchValue({locality:item})
    }

  ngOnInit() { this.loaderService.hideLoader();
    this.createPhotoFrameForm = this.formBuilder.group({
      _id: ['', [Validators.required]],
      name: ['', [Validators.required]],

      description: ['', [Validators.required]],

     
      targetType: ['', [Validators.required]],

     // targetAge: ['', [Validators.required]],
      locality: ['', [Validators.required]],

      startDate: ['', [Validators.required]],

      endDate: ['', [Validators.required]],
      mode: ['', [Validators.required]],
    
      category: ['', [Validators.required]],
      isAvailable: ['', [Validators.required]]

    });

    this.httpService.getApi('educationQualifications/getAll').subscribe((res) => {
      console.log(res)
      this.types = res
     
    })
    //this.createPhotoFrameForm.patchValue({targetType:[{name:'Male'},{name:'Female'},{name:'Other'}]})

this.loaderService.showLoader('Please wait, while fetching details').then(()=>{
    
  this.editDetails = JSON.parse(localStorage.getItem('editData'))
  this.createPhotoFrameForm.patchValue(this.editDetails);
  
 this.loaderService.hideLoader();
  
})


 this.httpService.getApi('photoFrames').subscribe(res => {
      this.frames = res;
      console.log(this.frames)
    })
  }

  allClicked(){
    this.gender.forEach(item=>{
      item['checked']=true;
    })
    
  }

  ionViewWillEnter() {
    this.getFrames();
    // if(localStorage.getItem('form')!==null){
      
    //   let data=JSON.parse(localStorage.getItem('form'));
		// this.createPhotoFrameForm.patchValue(data);
		
    //     this.Pamount1=data['paymentAmount']
    // }else{
    //   this.createPhotoFrameForm.reset()
    // }
    if(localStorage.getItem('searchAddress')!==null){
      this.createPhotoFrameForm.patchValue({locality:
        {
          lat:localStorage.getItem('searchLat'),
          lng:localStorage.getItem('searchLng'),
          address:localStorage.getItem('searchAddress'),
        }
        })
        
    }
  }

  getFrames() {
    this.httpService.getApi('photoFrames').subscribe(res => {
      this.frames = res;
      console.log(this.frames)
    })
  }
  getImageFrames(){
    console.log(this.createPhotoFrameForm.value.photoFrameCategory)
    this.frames.forEach(element => {
      if(element['_id'] == this.createPhotoFrameForm.value.photoFrameCategory){
        this.imageFrames = element.images
      }
      else{
        console.log("no item found")
      }
    });
    console.log(this.imageFrames)
  }
//image upload function
onFileChange(event) {

  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.loaderService.showLoader('Uploading photo, please wait ').then(() => {
      try {
        this.httpService.upload(formData, 'api/uploadImage').subscribe(res => {
          this.loaderService.hideLoader();
          console.log(res)
          this.createPhotoFrameForm.patchValue({
            photoFrameUrl: res.file
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




  submit(data) {
  
   // data['userId']=this.userService.getUserId()
  
    data['users'] = [];
    data['createdAt'] = new Date().getTime();
  

    if (!this.createPhotoFrameForm.valid) {
      console.log(data)
			this.util.enableFromValidation(this.createPhotoFrameForm);
			return;
    }
  
    this.startDate = this.createPhotoFrameForm.value.startDate 
    console.log(moment(new Date(this.startDate)))
    this.startDate=(new Date(this.startDate));
    console.log( "moment",moment(this.startDate).isAfter(moment().format('LL')))
    console.log( "moments",moment(this.startDate).isSame(moment().format('LL')))
    console.log( "moment1",moment(this.startDate).isSameOrBefore(moment(this.endDate))) 
   // return
// console.log(moment().format('LLL'))
// console.log(moment().format('LL'))
//console.log(moment().
      this.endDate=this.createPhotoFrameForm.value.endDate
      this.m=moment(this.startDate)
      this.n=moment(this.endDate)
     
      if(moment((this.startDate)).isSameOrAfter(moment().format('LL')) && moment(this.startDate).isSameOrBefore(moment(this.endDate)))
      {
      console.log("yes")
      console.log(data);
      this.loaderService.showLoader('Updating, please wait ').then(() => {
        try {
          this.httpService.postApi(data, 'createPhotoFrame/updateDetails/'+data.id).subscribe((res) => {
            this.loaderService.hideLoader();
            if (res["success"]) {
              this.photoResponse = res['data'];
              //this.payment();
              this.router.navigateByUrl('/create-photo-frame-list')
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
      else
      {
        this.alertService.presentAlert('Error',"Please check the dates you have entered", 'Okay');
      }
     

   

  }

  // payment() {
  //   console.log(this.photoResponse['isAvailable'])
  //   this.photoResponse['isAvailable']="1";
  //   console.log(this.photoResponse['_id'])
  //   this.loaderService.showLoader('Processing payment, please wait ..').then(() => {
  //     try {
  //       this.httpService.postApi(this.photoResponse, 'paymentStatus').subscribe((res) => {
  //         this.loaderService.hideLoader();

  //         if(res["success"])
  //         {
  //           this.httpService.postApi( this.photoResponse, 'createPhotoFrame/updateDetails/' +  this.photoResponse['_id']).subscribe((res: any) => {
  //             this.loaderService.hideLoader();
           
  //           });
  //         }
  //         this.clearData();
  //         this.router.navigateByUrl('/create-photo-frame-list')
  //       }, (err) => {

  //         this.loaderService.hideLoader();
  //         this.alertService.presentNetworkAlert();
  //       });
  //     } catch (e) {
  //       this.loaderService.hideLoader();
  //       this.alertService.presentAlert('Error', 'Something went wrong, please try again', 'Okay');
  //     }
  //   })
  // }

  clearData(){
    localStorage.removeItem('form');
    localStorage.removeItem('searchAddress');
    this.router.navigateByUrl('/create-photo-frame-list')
  }

  getLocality(){
    localStorage.setItem('url','/create-photo-frame-edit')
    localStorage.setItem('form',JSON.stringify(this.createPhotoFrameForm.value));
    this.router.navigateByUrl('/maps');
  }

  getSplittedname(url){
    let n=url.split('/');
    return n[n.length-1];
  }


}




