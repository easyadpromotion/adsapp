
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




@Component({
  selector: 'app-surveyQuestions-add',
  templateUrl: './survey-questions-add.page.html',
  styleUrls: ['./survey-questions-add.page.scss'],
})
export class SurveyQuestionsAddPage implements OnInit {
    surveyQuestionsForm: FormGroup;
    questions = [];
    categories = [];
	locations = [];
	types:any = [];
    errorMessage = '';
    error = false;
	preview = false;
	ages=[
		{name:'20-30'},
		{name:'30-40'},
		{name:'40-50'},
		{name:'50-60'}
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
  loading;
  frames=[];
  surveyResponse;
  Pamount1;
//   ages=[
//     {name:'20-30'},
//     {name:'30-40'},
//     {name:'40-50'},
//     {name:'50-60'}
//   ]
//   dropdownSettings = {
//     singleSelection: false,
//     idField: 'name',
//     textField: 'name',
//     selectAllText: 'Select All',
//     unSelectAllText: 'UnSelect All',
//     itemsShowLimit: 3,
//     allowSearchFilter: true
//   }
totalAmount
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  gender=[
    {name:'Male',selected:true},
    {name:'Female',selected:true},
    {name:'Other',selected:true},
  ]
  // maps end 

  myDate=[]

  startDate
  endDate
  m
  n
  newdate
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
	public httpService: HttpServiceService, public alertService: AlertService,
	private iab: InAppBrowser,public firebase:FirebaseDbService,
    public userService: UserService,public zone: NgZone,public util:UtilService,
    public loaderService: LoaderService) { 
		
	}


  ngOnInit() { this.loaderService.hideLoader();
	this.surveyQuestionsForm = this.formBuilder.group({
		name: ['', [Validators.required]],
		description: ['', [Validators.required]],
		targetCount: ['', [Validators.required]],
		locality: ['', [Validators.required]],
		startDate: ['', [Validators.required]],
		endDate: ['', [Validators.required]],
		paymentAmount:['', [Validators.required]],
		//paymentStatus:[0, [Validators.required]]
		category: [''],
	}); 
	this.addQuestion();  
	
	this.httpService.getApi('educationQualifications/getAll').subscribe((res) => {
		console.log(res)
		this.types = res
	})
    // this.surveyQuestionsForm.patchValue({targetType:[{name:'Male'},{name:'Female'},{name:'Other'}]})
  }

  



  ionViewWillEnter()
  {

	if(localStorage.getItem('form')!==null){
		let data=JSON.parse(localStorage.getItem('form'));
		this.surveyQuestionsForm.patchValue(data);
		this.questions=JSON.parse(localStorage.getItem('questions'))
		if(!this.questions){
			this.questions=[];
			this.addQuestion()
		}
		
        this.Pamount1=data['paymentAmount']
      }else{
		  this.surveyQuestionsForm.reset()
	  }
      if(localStorage.getItem('searchAddress')!==null){
        this.surveyQuestionsForm.patchValue({locality:
          {
            lat:localStorage.getItem('searchLat'),
            lng:localStorage.getItem('searchLng'),
            address:localStorage.getItem('searchAddress'),
          }
          })
          
      }
	this.httpService.getApi('educationQualifications/getAll').subscribe((res) => {
		console.log(res)
		this.types = res
	})
  }

 	changedResponseType(question) {
		if (question.ResponseType == 'tags') {
			this.resetMultipleTypes(question);
			question.tags = [ { tag: '' } ];
		}
		if (question.ResponseType == 'radio') {
			this.resetMultipleTypes(question);
			question.radio = [ { radio: '' } ];
		}
		if (question.ResponseType == 'checkbox') {
			this.resetMultipleTypes(question);
			question.checkbox = [ { checkbox: '' } ];
		}
		if (question.ResponseType == 'multi') {
			this.resetMultipleTypes(question);
			question.multi = [ { text: '' } ];
		}
  }
  resetMultipleTypes(question) {
		if (question.tags) {
			delete question.tags;
		}
		if (question.radio) {
			delete question.radio;
		}
		if (question.checkbox) {
			delete question.checkbox;
		}
		if (question.multi) {
			delete question.multi;
		}
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
	

  addRadio(tag) {
		tag.push({ radio: '' });
	}

	targetChange(data)
	{
		this.Pamount1=((this.questions.length)*1)*data;
		console.log(this.questions.length)
		this.surveyQuestionsForm.patchValue({'paymentAmount':this.Pamount1});
		console.log("paymentAmount", this.Pamount1);
		this.totalAmount=((this.Pamount1)*70)/100;
		this.surveyQuestionsForm.patchValue({'amount':this.totalAmount});
	}

	add(data){
		localStorage.removeItem('form'); 
		localStorage.removeItem('searchAddres');
		localStorage.removeItem('questions');
		this.firebase.addData('surveyads',data).then(res=>{
		  this.alertService.presentAlert('Success','Survey ad was promoted successfully','Okay');
		  this.router.navigateByUrl('/survey-questions-list');
		})
		
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

	  submit(data) {
    
		data['users'] = [];
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
		data['questions']=this.questions;
	
		if (!this.surveyQuestionsForm.valid) {
		  console.log(data)
				this.util.enableFromValidation(this.surveyQuestionsForm);
				return;
			}
	  
	  
		  this.startDate = this.surveyQuestionsForm.value.startDate 
		  this.startDate=(new Date(this.startDate));
	
		  this.endDate=this.surveyQuestionsForm.value.endDate
		  this.m=moment(this.startDate)
		  this.n=moment(this.endDate)
	
		  if(moment((this.startDate)).isSameOrAfter(moment().format('LL')) && moment(this.startDate).isSameOrBefore(moment(this.endDate)))
		  {
			this.pai(data); 
		  }
		  else
		  {
			this.alertService.presentAlert('Error',"Please check the dates you have entered", 'Okay');
		  }
	
	   
	
	  }

	  toggleGender(gender){
		gender.selected=!gender.selected
	  }

  validateCustomFields = () => {
		return new Promise((resolve,reject)=>{
			if (this.surveyQuestionsForm.value.contactShow && this.surveyQuestionsForm.value.contactConfigure == '') {
				this.surveyQuestionsForm.controls['contactConfigure'].setErrors({ incorrect: true });
				resolve(0);
			} else {
				let flag = 0;
				let array=this.questions;
				let ctr=0;
				this.questions.forEach((question,index,array) => {
					question.errors = [];
					ctr++;
					if (question.Title == '') {
						question.errors.push('Enter valid title');
					}
					if (question.ResponseType == '') {
						question.errors.push('select valid response type');
					}
					if(question.errors.length)
					resolve(0);
					if (ctr === array.length) {
						if(question.errors.length)
						resolve(0);
						else
						resolve(1);
					}
				});

				
			}
	
		})
				
	};
  onSubmit() {
		
		if (this.surveyQuestionsForm.valid) {
			this.validateCustomFields().then(res=>{
				this.loaderService.hideLoader();
				if(res){ 
					let json = this.surveyQuestionsForm.value;
				json['dynamicForm'] = this.questions;
				console.log(this.questions.length)
		  this.submit(json)

				}else{
					this.loaderService.hideLoader();
				//	this.modal.showModal({ success: false, message: 'Seems data entered has problem, Please checkit' });
				}
			})
			
		} else {
			Object.keys(this.surveyQuestionsForm.controls).forEach((field) => {
				const control = this.surveyQuestionsForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
			this.loaderService.hideLoader();
		}
	}

	addQuestion() {
		this.questions.push({
			Title: '',
			canSkip: false,
			ResponseType:'radio',
			radio:[{ radio: '' }]
		});

		console.log(this.questions)
		this.Pamount1=((this.questions.length)*1)*(this.surveyQuestionsForm.value.targetCount);
		console.log(this.questions.length)
		this.surveyQuestionsForm.patchValue({'paymentAmount':this.Pamount1});
		console.log("paymentAmount", this.Pamount1);
		let totalAmount=(this.Pamount1*70)/100;
		this.surveyQuestionsForm.patchValue({'amount':totalAmount});
	}

	deleteQuestion(index) {
		if (this.questions.length > 1) {
			this.questions.splice(index, 1);
		//console.log(this.questions.length)
		this.Pamount1=((this.questions.length)*1)*(this.surveyQuestionsForm.value.targetCount);
		console.log(this.questions.length)
		this.surveyQuestionsForm.patchValue({'paymentAmount':this.Pamount1});
		console.log("paymentAmount", this.Pamount1);
		let totalAmount=(this.Pamount1*70)/100;
		this.surveyQuestionsForm.patchValue({'amount':totalAmount});
		}
	}

	payment(params) {
		this.surveyResponse['isAvailable']="1";
		this.loaderService.showLoader('Processing payment, please wait').then(() => {
		  try {
			this.httpService.postApi(this.surveyResponse, 'paymentStatus').subscribe((res) => {
			  this.loaderService.hideLoader();
			  if (res["success"]) {
				//make use of payment response
				if (res['data']['paymentStatus'] == 0) {
				  this.alertService.presentAlert('Error', 'Payment not done', 'Okay');
				}
				else if (res['data']['paymentStatus'] == 1) {
				  //update isavailable in photo edit
				  this.surveyQuestionsForm['isAvailable'] ='1'
				  this.surveyQuestionsForm['updatedAt'] = new Date().getTime();
				  this.httpService.postApi(this.surveyResponse, 'surveyQuestions/updateDetails/'+this.surveyResponse.id).subscribe((res) => {
					if(res["success"]){
						this.clearData()
					//   this.alertService.presentAlert('Success', 'Successfully updated', 'Okay');
					  this.router.navigate(['/survey-questions-list'])
					}else{
					  this.alertService.presentAlert('Error', res["message"], 'Okay');
					}
				  }) 	
				//   this.alertService.presentAlert('Success', 'Payment Sucess', 'Okay');
				}
				else {
				  this.alertService.presentAlert('Error', 'Payment Failed', 'Okay');
				}
				//this.router.navigate(['/create-video-list'])
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

	  clearData(){
		localStorage.removeItem('form');
		localStorage.removeItem('searchAddress');
	  }
	  getLocality(){
		localStorage.setItem('url','/survey-questions-add')
		localStorage.setItem('form',JSON.stringify(this.surveyQuestionsForm.value));
		localStorage.setItem('questions',JSON.stringify(this.questions));
		this.router.navigateByUrl('/maps');
	  }
}

    

