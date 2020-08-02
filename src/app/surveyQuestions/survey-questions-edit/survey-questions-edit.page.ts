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
import { FirebaseDbService } from 'src/app/firebase-db.service';

@Component({
  selector: 'app-surveyQuestions-edit',
  templateUrl: './survey-questions-edit.page.html',
  styleUrls: ['./survey-questions-edit.page.scss'],
})
export class SurveyQuestionsEditPage implements OnInit {
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
    {name:'Male',selected:false},
    {name:'Female',selected:false},
    {name:'Other',selected:false},
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
  editData:any={};
  startDate
  endDate
  m
  n
  newdate
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public userService: UserService, public firebase:FirebaseDbService,
    public loaderService: LoaderService, public utilService: UtilService,public util:UtilService,
    public zone: NgZone) { 
    }

    

    toggleGender(gender){
      gender.selected=!gender.selected
    }

    selectSearchResult(item) {
      this.location = item;
      this.createPhotoFrameForm.patchValue({locality:item})
    }

  ngOnInit() { 
    this.loaderService.hideLoader();
    this.createPhotoFrameForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });

    this.editData=JSON.parse(localStorage.getItem('editData'));
    // this.createPhotoFrameForm.patchValue(this.editData)
    // this.gender=this.editData['gender'];
    // this.createPhotoFrameForm.patchValue({targetType:[{name:'Male'},{name:'Female'},{name:'Other'}]})
  }

  getParamsAsObject(query) {

    query = query.substring(query.indexOf('?') + 1);

    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g;

    var decode = function (str) {
        return decodeURIComponent(str.replace(decodeRE, " "));
    };

    var params = {}, e;
    while (e = re.exec(query)) {
        var k = decode(e[1]), v = decode(e[2]);
        if (k.substring(k.length - 2) === '[]') {
            k = k.substring(0, k.length - 2);
            (params[k] || (params[k] = [])).push(v);
        }
        else params[k] = v;
    }

    var assign = function (obj, keyPath, value) {
        var lastKeyIndex = keyPath.length - 1;
        for (var i = 0; i < lastKeyIndex; ++i) {
            var key = keyPath[i];
            if (!(key in obj))
                obj[key] = {}
            obj = obj[key];
        }
        obj[keyPath[lastKeyIndex]] = value;
    }

    for (var prop in params) {
        var structure = prop.split('[');
        if (structure.length > 1) {
            var levels = [];
            structure.forEach(function (item, i) {
                var key = item.replace(/[?[\]\\ ]/g, '');
                levels.push(key);
            });
            assign(params, levels, params[prop]);
            delete(params[prop]);
        }
    }
    return params;
  }

 
  ionViewWillEnter() {
    
    if(localStorage.getItem('form')!==null){
      
      let data=JSON.parse(localStorage.getItem('form'));
		this.createPhotoFrameForm.patchValue(data);
		
        this.Pamount1=data['paymentAmount']
    }else{
      this.createPhotoFrameForm.reset()
    }
    if(localStorage.getItem('searchAddress')!==null){
      this.createPhotoFrameForm.patchValue({locality:
        {
          lat:localStorage.getItem('searchLat'),
          lng:localStorage.getItem('searchLng'),
          address:localStorage.getItem('searchAddress'),
        }
        })
        
    }

    this.editData=JSON.parse(localStorage.getItem('editData'));
    this.createPhotoFrameForm.patchValue(this.editData)
    this.gender=this.editData['gender'];
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


  targetChange(data)
  {
    this.Pamount1=data*1;
      this.createPhotoFrameForm.patchValue({'paymentAmount':this.Pamount1});
      console.log("paymentAmount",this.Pamount1);
    this.totalAmount=((this.Pamount1)*70)/100;
      console.log("Amount", this.totalAmount);
      this.createPhotoFrameForm.patchValue({'amount': this.totalAmount});
  }

  submit(data) {
    data['updatedAt'] = new Date().toISOString();
    data['gender']=this.gender;
     
    if (!this.createPhotoFrameForm.valid) {
      console.log(data)
			this.util.enableFromValidation(this.createPhotoFrameForm);
			return;
    }
    this.loaderService.showLoader('');
      this.startDate = this.createPhotoFrameForm.value.startDate 
      this.startDate=(new Date(this.startDate));
    
      this.endDate=this.createPhotoFrameForm.value.endDate
      this.endDate=(new Date(this.endDate));
      this.m=moment(this.startDate)
      this.n=moment(this.endDate)

      console.log(this.m,this.n)
     
      if(moment(this.startDate).isSameOrBefore(moment(this.endDate)))
      {

        this.firebase.updateData('surveyads',this.editData.id,data).then(()=>{
          this.loaderService.hideLoader();
          this.router.navigateByUrl('/survey-questions-list');
        })
        
      }
      else
      {
        this.loaderService.hideLoader();
        this.alertService.presentAlert('Error',"Please check the dates you have entered", 'Okay');
      } 

  }

  pai(data){
    this.loaderService.showLoader('');
    this.add(data);
  }

  add(data){
    localStorage.removeItem('form'); 
    localStorage.removeItem('searchAddres');
    this.firebase.addData('photoads',data).then(res=>{
      this.alertService.presentAlert('Success','Photo ad was promoted successfully','Okay');
      this.router.navigateByUrl('/survey-questions-list');
    })
    
  }


  clearData(){
    localStorage.removeItem('form');
    localStorage.removeItem('searchAddress');
    this.router.navigateByUrl('/survey-questions-list')
  }

  getLocality(){
    localStorage.setItem('url','/survey-questions-edit')
    localStorage.setItem('form',JSON.stringify(this.createPhotoFrameForm.value));
    this.router.navigateByUrl('/maps'); 
  }

}



