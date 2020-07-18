
import { Component, OnInit,NgZone } from '@angular/core';
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
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FirebaseDbService } from 'src/app/firebase-db.service';

declare var google : google;



@Component({
  selector: 'app-createPhotoFrame-add',
  templateUrl: './create-photo-frame-add.page.html',
  styleUrls: ['./create-photo-frame-add.page.scss'],
})
export class CreatePhotoFrameAddPage implements OnInit {
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
    {name:'Male',selected:true},
    {name:'Female',selected:true},
    {name:'Other',selected:true},
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
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public userService: UserService, public firebase:FirebaseDbService,
    private iab: InAppBrowser,
    public loaderService: LoaderService, public utilService: UtilService,public util:UtilService,
    public zone: NgZone) { 
  //     this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  // this.autocomplete = { input: '' };
  // this.autocompleteItems = [];

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
      targetCount: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      photoFrameUrl: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      paymentAmount:['', [Validators.required]],
      category: ['', [Validators.required]]

    });

    this.httpService.getApi('educationQualifications/getAll').subscribe((res) => {
      console.log(res)
      this.types = res
     
    })
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
    this.getFrames();
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
    
    data['targetReached'] =0;
    data['userId']=this.userService.getUserId()
    data['isAvailable']=true;
    data['users'] = [];
    data['createdAt'] = new Date().toISOString();
    data['amount']=  this.totalAmount;
    data['amountPaid']= this.Pamount1;
    data['photoFrame']='-';
    data['photoFrameCategory']='-';
    data['gender']=this.gender;
     
    if (!this.createPhotoFrameForm.valid) {
      console.log(data)
			this.util.enableFromValidation(this.createPhotoFrameForm);
			return;
    }
      this.startDate = this.createPhotoFrameForm.value.startDate 
      this.startDate=(new Date(this.startDate));
    
      this.endDate=this.createPhotoFrameForm.value.endDate
      this.m=moment(this.startDate)
      this.n=moment(this.endDate)
     
      if(moment((this.startDate)).isSameOrAfter(moment().format('LL')) && moment(this.startDate).isSameOrBefore(moment(this.endDate)))
      {
        this.pai(data)
      }
      else
      {
        this.alertService.presentAlert('Error',"Please check the dates you have entered", 'Okay');
      } 

  }

  pai(data){
    this.loaderService.showLoader('');
    let userData=JSON.parse(localStorage.getItem('userData'));
    this.httpService.getPaymentLink("generateGateway",
    {
      "customer": {
        "name": userData['name'],
        "email": userData['emailAddress']?userData['emailAddress']:'saisasank001@gmail.com',
        "contact":  userData['phoneNumber']
      },
      "type": "link",
      "view_less": 1,
      "amount": eval(data['amountPaid']+"")*100,
      "currency": "INR",
      "description": "Payment Link for this purpose - promote ad.",
      "receipt": "TS"+Math.floor((Math.random()*1000000000)+1),
      "reminder_enable": true,
      "sms_notify": 1,
      "email_notify": 1,
      "expire_by": 1793630556,
      "callback_url": "http://18.221.73.114:3005/initateTransaction",
      "callback_method": "get"
    }
    ).subscribe(res=>{
      this.loaderService.hideLoader();
      console.log({res});
      data['payment-response']=res;
      let url=res.short_url;
      let options = {
        location : 'yes',//Or 'no' 
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes',//Android only ,shows browser zoom controls 
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', //Android only 
        closebuttoncaption : 'Close', //iOS only
        disallowoverscroll : 'no', //iOS only 
        toolbar : 'yes', //iOS only 
        enableViewportScale : 'no', //iOS only 
        allowInlineMediaPlayback : 'no',//iOS only 
        presentationstyle : 'pagesheet',//iOS only 
        fullscreen : 'yes',//Windows only    
      };
      const browser = this.iab.create(url,"_blank", "toolbar=no,location=no,clearsessioncache=yes,clearcache=yes");

if (browser.on('loadstart').subscribe)
	browser.on('loadstart').subscribe((e) => {
      console.log({e})
      let url=e.url;
      if(url.includes('http://18.221.73.114:3005/initateTransaction'))
      {
        browser.close();
        let params=this.getParamsAsObject(e.url);
        console.log(params);
        if(params['razorpay_invoice_status']=="paid")
        {
          data.params=params;
          this.add(data);
        }else{
          this.alertService.presentAlert('Error','transactionId:'+params['txid'],'Sorry payment failed, please pay to continue');
        }

      }
      

	});

//When the InAppBrowser is closed, check and use the last viewed URL
if (browser.on('exit').subscribe)
	browser.on('exit').subscribe((e) => {
		console.log({exit:e})
			
	});
    })
  }

  add(data){
    localStorage.removeItem('form'); 
    localStorage.removeItem('searchAddres');
    this.firebase.addData('photoads',data).then(res=>{
      this.alertService.presentAlert('Success','Photo ad was promoted successfully','Okay');
      this.router.navigateByUrl('/create-photo-frame-list');
    })
    
  }

  payment(params) {
    console.log(this.photoResponse['isAvailable'])
    this.photoResponse['isAvailable']="1";
    console.log(this.photoResponse['_id'])
    this.loaderService.showLoader('Processing payment, please wait ..').then(() => {
      try {
        this.httpService.postApi(this.photoResponse, 'paymentStatus').subscribe((res) => {
          this.loaderService.hideLoader();

          if(res["success"])
          {
            this.httpService.postApi( this.photoResponse, 'createPhotoFrame/updateDetails/' +  this.photoResponse['_id']).subscribe((res: any) => {
              this.loaderService.hideLoader();
           
            });
          }
          this.clearData();
          this.router.navigateByUrl('/create-photo-frame-list')
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

  clearData(){
    localStorage.removeItem('form');
    localStorage.removeItem('searchAddress');
    this.router.navigateByUrl('/create-photo-frame-list')
  }

  getLocality(){
    localStorage.setItem('url','/create-photo-frame-add')
    localStorage.setItem('form',JSON.stringify(this.createPhotoFrameForm.value));
    this.router.navigateByUrl('/maps');
  }


}



