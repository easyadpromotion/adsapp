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
  selector: 'app-create-video-edit',
  templateUrl: './create-video-edit.page.html',
  styleUrls: ['./create-video-edit.page.scss'],
})
export class CreateVideoEditPage implements OnInit {
  createVideoForm: FormGroup;
  loading;
  vid
  types: any = [];
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
    allowSearchFilter: true
  }
  videoResponse;
  Pamount1;
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  // maps end 
  totalAmount
  myDate=[]

  startDate
  endDate

  newdate
  editDetails
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public userService: UserService,public zone: NgZone, public util:UtilService,
    public loaderService: LoaderService) {
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
            console.log({prediction})
          });
        });
      });
    }
    selectSearchResult(item) {
      this.location = item;
      this.createVideoForm.patchValue({locality:item})
    }

   

  ngOnInit() { this.loaderService.hideLoader();
    this.createVideoForm = this.formBuilder.group({
      _id: ['', [Validators.required]],
      name: ['', [Validators.required]],

      description: ['', [Validators.required]],

      
      targetType: ['', [Validators.required]],

     
      startDate: ['', [Validators.required]],

      endDate: ['', [Validators.required]],
      category:[],
       locality: ['', [Validators.required]],
      //  seconds: ['',[Validators.required]],
       isAvailable: ['',[Validators.required]]
    });

    this.httpService.getApi('educationQualifications/getAll').subscribe((res) => {
      console.log(res)
      this.types = res
    })

    this.loaderService.showLoader('Please wait, while fetching details').then(()=>{
    
      this.editDetails = JSON.parse(localStorage.getItem('editData'))
      this.createVideoForm.patchValue(this.editDetails);
      console.log(  this.editDetails)
     this.loaderService.hideLoader();
     
    })


   // this.createVideoForm.patchValue({targetType:[{name:'Male'},{name:'Female'},{name:'Other'}]})
  }

  // allClickedCategories(){
  //   this.createVideoForm.patchValue({targetType:['Btech']})
  //   if(this.createVideoForm.value.targetType.length){

  //   }
  // }


  ionViewWillEnter(){
  
    // if(localStorage.getItem('form')!==null){
    //   let data=JSON.parse(localStorage.getItem('form'));
    //   console.error(data)
    //   this.createVideoForm.patchValue(data);
    //   this.Pamount1=data['paymentAmount']
    // }else{
    //   this.createVideoForm.reset()
    // }
    if(localStorage.getItem('searchAddress')!==null){
      this.createVideoForm.patchValue({locality:
        {
          lat:localStorage.getItem('searchLat'),
          lng:localStorage.getItem('searchLng'),
          address:localStorage.getItem('searchAddress'),
        }
        })
        
    }
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
    //  this.myFunction()
       formData.append('file', file);
     // var vid=document.getElementById('file');
      this.loaderService.showLoader('Uploading video, please wait ').then(() => {
        try {
          this.httpService.upload(formData, 'api/upload').subscribe(res => {
            this.loaderService.hideLoader();
            console.log(res)
            this.createVideoForm.patchValue({
              videoUrl: res.file,
              videoImage: res.thumbnail
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

  // targetChange(data)
  // {
  //   try{
  //     let seconds=this.createVideoForm.value.seconds;
  //     this.Pamount1=((seconds*(0.1))*data).toFixed(2);
  //       this.createVideoForm.patchValue({'paymentAmount':this.Pamount1});
  //       console.log("paymentAmount", this.Pamount1);
  //       this.totalAmount=(((this.Pamount1)*70)/100).toFixed(2);
  //       this.createVideoForm.patchValue({'amount':this.totalAmount});
  //   }catch(e){

  //   }
  //   console.log(data);
   

  // }

  submit(data) {
   

// data['targetReached'] ="0";
// data['userId']=this.userService.getUserId();
// data['isAvailable']="0";
// data['skip']=1;
//  data['paymentStatus']="0";
// data['targetAge']='-';
// console.log(this.userService.getUserId())


data['updatedAt'] = new Date().getTime();
//data['amount']= this.totalAmount;
console.log(data)
    if (!this.createVideoForm.valid) {
      console.log(data)
			this.util.enableFromValidation(this.createVideoForm);
			return;
		}
  
   
    this.startDate = this.createVideoForm.value.startDate 
    console.log(moment(new Date(this.startDate)))
    this.startDate=(new Date(this.startDate));
    console.log( "moment",moment(this.startDate).isAfter(moment().format('LL')))
    console.log( "moments",moment(this.startDate).isSame(moment().format('LL')))
    console.log( "moment1",moment(this.startDate).isSameOrBefore(moment(this.endDate))) 

      this.endDate=this.createVideoForm.value.endDate
  

      if(moment((this.startDate)).isSameOrAfter(moment().format('LL')) && moment(this.startDate).isSameOrBefore(moment(this.endDate)))
      {
      console.log("yes")
      this.loaderService.showLoader('Updating, please wait ').then(() => {
        try {
          this.httpService.postApi(data, 'createVideo/updateDetails/'+data.id).subscribe((res) => {
            this.loaderService.hideLoader();
            if (res["success"]) {
              this.videoResponse = res['data']
              this.alertService.presentAlert('Success', 'Video is Edited successfully', 'Okay');
              this.clearData()
               this.router.navigate(['/create-video-list'])
             // this.payment();
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

  // selectAll(){
  //   this.createVideoForm.patchValue({targetType:'Male'})
  // }

  // payment() {
  //   this.videoResponse['isAvailable']="1";
  //   this.loaderService.showLoader('Processing payment, please wait').then(() => {
  //     try {
  //       this.httpService.postApi(this.videoResponse, 'paymentStatus').subscribe((res) => {
  //         this.loaderService.hideLoader();
  //         if (res["success"]) {
  //           //make use of payment response
  //           if (res['data']['paymentStatus'] == 0) {
  //             //this.alertService.presentAlert('Success', 'Payment not done', 'Okay');
  //           }
  //           else if (res['data']['paymentStatus'] == 1) {
  //             //update isavailable in video edit
  //             this.videoResponse['isAvailable'] ='1'
  //             this.videoResponse['updatedAt'] = new Date().getTime();
  //             this.httpService.postApi(this.videoResponse, 'createVideo/updateDetails/'+this.videoResponse['_id']).subscribe((res) => {
  //               if(res["success"]){
  //                 //this.alertService.presentAlert('Success', 'Successfully updated', 'Okay');
  //                 this.clearData()
  //                 this.router.navigate(['/create-video-list'])
  //               }else{
  //                 this.alertService.presentAlert('Error', res["message"], 'Okay');
  //               }
  //             })
  //             // this.alertService.presentAlert('Success', 'Payment Success', 'Okay');
  //           }
  //           else {
  //             this.alertService.presentAlert('Failed', 'Payment Failed', 'Okay');
  //           }
  //           //this.router.navigate(['/create-video-list'])
  //         } else {
  //           this.alertService.presentAlert('Error', res["message"], 'Okay');
  //         }
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
    this.router.navigateByUrl('/create-video-list')
  }

  getLocality(){
    localStorage.setItem('url','/create-video-edit')
    localStorage.setItem('form',JSON.stringify(this.createVideoForm.value));
    this.router.navigateByUrl('/maps');
  }

}
