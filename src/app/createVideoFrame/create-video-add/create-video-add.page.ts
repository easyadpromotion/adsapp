
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
  selector: 'app-createVideo-add',
  templateUrl: './create-video-add.page.html',
  styleUrls: ['./create-video-add.page.scss'],
})
export class CreateVideoAddPage implements OnInit {
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
  m
  n
  newdate
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public userService: UserService,public zone: NgZone, public util:UtilService,
    private iab: InAppBrowser, public firebase:FirebaseDbService,
    public loaderService: LoaderService) {
     
     }

   
    ionViewWillEnter(){
      if(localStorage.getItem('form')!==null){
        let data=JSON.parse(localStorage.getItem('form'));
        console.error(data)
        this.createVideoForm.patchValue(data);
        this.Pamount1=data['paymentAmount']
      }else{
        this.createVideoForm.reset()
      }
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

  ngOnInit() { 
    
   
    this.loaderService.hideLoader();
    this.createVideoForm = this.formBuilder.group({

      name: ['', [Validators.required]],

      description: ['', [Validators.required]],

      targetCount: ['', [Validators.required]],
     
      amount: ['', [Validators.required]],

     

      videoUrl: ['', [Validators.required]],

      videoImage: ['', [Validators.required]],

      startDate: ['', [Validators.required]],

      endDate: ['', [Validators.required]],
        mode:['',Validators.required],
       paymentAmount:['', [Validators.required]],
       locality: ['', [Validators.required]],
       category: ['', [Validators.required]],
       seconds: ['',[Validators.required]]
    
    });

    this.httpService.getApi('educationQualifications/getAll').subscribe((res) => {
      console.log(res)
      this.types = res
    })
    // this.createVideoForm.patchValue({targetType:[{name:'Male'},{name:'Female'},{name:'Other'}]})
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

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      
      if(file.name.indexOf('mp4')<1){
        this.alertService.presentAlert('Error','Please upload mp4 files','Got it!');
        return;
      }
      var video = document.createElement('video');
  video.preload = 'metadata';

  video.onloadedmetadata = ()=> {
    window.URL.revokeObjectURL(video.src);
    var duration = video.duration;
    if(duration>61){
      
      this.alertService.presentAlert('Error','','Video cannot be more than 1 minute');
    }else{
      
      const formData = new FormData();
      //this.myFunction()
      formData.append('file', file);
      // var vid=document.getElementById(file);
      this.loaderService.showLoader('Uploading video, please wait ').then(() => {
        try {
          this.httpService.upload(formData, 'api/upload').subscribe(res => {
            this.loaderService.hideLoader();
            this.createVideoForm.patchValue({seconds:duration})
            this.targetChange(this.createVideoForm.value.targetCount)
      console.log(this.createVideoForm.value)
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

  video.src = URL.createObjectURL(file);
     
     


    }
  }


  selectAll(){
    this.createVideoForm.patchValue({targetType:'Male'})
  }

  targetChange(data)
  {
    this.Pamount1=data*1;
      this.createVideoForm.patchValue({'paymentAmount':this.Pamount1});
      console.log("paymentAmount",this.Pamount1);
    this.totalAmount=((this.Pamount1)*70)/100;
      console.log("Amount", this.totalAmount);
      this.createVideoForm.patchValue({'amount': this.totalAmount});
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
     
    if (!this.createVideoForm.valid) {
      console.log(data)
			this.util.enableFromValidation(this.createVideoForm);
			return;
    }
      this.startDate = this.createVideoForm.value.startDate 
      this.startDate=(new Date(this.startDate));
    
      this.endDate=this.createVideoForm.value.endDate
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
    this.firebase.addData('videoads',data).then(res=>{
      this.alertService.presentAlert('Success','Photo ad was promoted successfully','Okay');
      this.router.navigateByUrl('/create-video-list');
    })
    
  }

  clearData(){
    localStorage.removeItem('form');
    localStorage.removeItem('searchAddress');
    this.router.navigateByUrl('/create-video-list')
  }

  getLocality(){
    localStorage.setItem('url','/create-video-add')
    localStorage.setItem('form',JSON.stringify(this.createVideoForm.value));
    this.router.navigateByUrl('/maps');
  }

   myFunction() { 
    console.log(this.vid.duration);
  }
}



