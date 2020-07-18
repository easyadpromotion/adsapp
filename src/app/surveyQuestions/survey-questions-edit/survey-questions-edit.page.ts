import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/alert.service';
import { LoaderService } from 'src/app/loader.service';
import { UserService } from 'src/app/user.service';
import * as moment from 'moment';

import { google } from "google-maps";
import { UtilService } from 'src/app/util.service';

declare var google : google;

@Component({
  selector: 'app-survey-questions-edit',
  templateUrl: './survey-questions-edit.page.html',
  styleUrls: ['./survey-questions-edit.page.scss'],
})
export class SurveyQuestionsEditPage implements OnInit {

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
    {name:'Male'},
    {name:'Female'},
    {name:'Other'},
  ]
  // maps end 
  editDetails
  myDate=[]

  startDate
  endDate
  m
  n
  newdate
  constructor(private formBuilder: FormBuilder, private router: Router, public loadingCtrl: LoadingController,
    public httpService: HttpServiceService, public alertService: AlertService,
    public userService: UserService,public zone: NgZone,public util:UtilService,
    public loaderService: LoaderService) { 
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
	}


  ngOnInit() { this.loaderService.hideLoader();
	this.surveyQuestionsForm = this.formBuilder.group({
    _id: ['', [Validators.required]],
		name: ['', [Validators.required]],
		description: ['', [Validators.required]],
		
		targetType: ['', [Validators.required]],
		//targetAge:['', [Validators.required]],
		locality: ['', [Validators.required]],
		startDate: ['', [Validators.required]],
		endDate: ['', [Validators.required]],
		isAvailable: ['', [Validators.required]],
	//	paymentStatus:['', [Validators.required]]
    category:[''],
   
    
  
   
     targetAge:['', [Validators.required]],
    paymentStatus:['', [Validators.required]],
   // surveyQuestions:['', [Validators.required]],
	}); 

  this.loaderService.showLoader('Please wait, while fetching details').then(()=>{
    
    this.editDetails = JSON.parse(localStorage.getItem('editData'))
    this.surveyQuestionsForm.patchValue(this.editDetails);
    console.log(  this.editDetails)
   this.loaderService.hideLoader();
   
  })
	this.httpService.getApi('educationQualifications/getAll').subscribe((res) => {
		console.log(res)
		this.types = res
	})
   // this.surveyQuestionsForm.patchValue({targetType:[{name:'Male'},{name:'Female'},{name:'Other'}]})
  }



  ionViewWillEnter()
  {

	// if(localStorage.getItem('form')!==null){
	// 	let data=JSON.parse(localStorage.getItem('form'));
	// 	this.surveyQuestionsForm.patchValue(data);
		
        
  //     }else{
	// 	  this.surveyQuestionsForm.reset()
	//   }
      if(localStorage.getItem('searchAddress')!==null){
        this.surveyQuestionsForm.patchValue({locality:
          {
            lat:localStorage.getItem('searchLat'),
            lng:localStorage.getItem('searchLng'),
            address:localStorage.getItem('searchAddress'),
          }
          })
          
      }
	
  }


  addRadio(tag) {
		tag.push({ radio: '' });
	}

	// targetChange(data)
	// {
	// 	this.Pamount1=((this.questions.length)*1)*data;
	// 	console.log(this.questions.length)
	// 	this.surveyQuestionsForm.patchValue({'paymentAmount':this.Pamount1});
	// 	console.log("paymentAmount", this.Pamount1);
	// 	this.totalAmount=((this.Pamount1)*70)/100;
	// 	this.surveyQuestionsForm.patchValue({'amount':this.totalAmount});
	// }


  submit(data){

	data['createAt']= new Date().getTime();

data['users']=[];
	
	console.log(data)
	if (!this.surveyQuestionsForm.valid) {
		console.log(data)
		this.util.enableFromValidation(this.surveyQuestionsForm);
		return;
	}  

	console.log("amount", data['amount']);
	console.log(JSON.stringify(data))

	this.startDate = this.surveyQuestionsForm.value.startDate 
    console.log(moment(new Date(this.startDate)))
    this.startDate=(new Date(this.startDate));
    console.log( "moment",moment(this.startDate).isAfter(moment().format('LL')))
    console.log( "moments",moment(this.startDate).isSame(moment().format('LL')))
    console.log( "moment1",moment(this.startDate).isSameOrBefore(moment(this.endDate))) 
   // return
// console.log(moment().format('LLL'))
// console.log(moment().format('LL'))
//console.log(moment().
      this.endDate=this.surveyQuestionsForm.value.endDate
      this.m=moment(this.startDate)
      this.n=moment(this.endDate)
     
      if(moment((this.startDate)).isSameOrAfter(moment().format('LL')) && moment(this.startDate).isSameOrBefore(moment(this.endDate)))
      {
	  console.log("yes")
	  this.loaderService.showLoader('Updating, please wait').then(()=>{
		try{
		 this.httpService.postApi(data, 'surveyQuestions/updateDetails/'+data.id).subscribe((res) => {
		   this.loaderService.hideLoader();
		   if(res["success"]){
			   console.log(res.data)
			   this.surveyResponse = res['data']
			 this.alertService.presentAlert('Success','Survey ad successfully updated','Okay');
			 this.router.navigate(['/survey-questions-list'])
			 
		   }else{
			 this.alertService.presentAlert('Error',res["message"],'Okay');
		   }    
		 },(err)=>{
		   
		   this.loaderService.hideLoader();
		   this.alertService.presentNetworkAlert();
		  });
	   }catch(e){
		 this.loaderService.hideLoader();
		 this.alertService.presentAlert('Error','Something went wrong, please try again','Okay');
	   }
	  })
	  }

	  else
	  {
		this.alertService.presentAlert('Error',"Please check the dates you have entered", 'Okay');
	  }
	
  

     
    
  }

  



	  clearData(){
		localStorage.removeItem('form');
		localStorage.removeItem('searchAddress');
	  }
	  getLocality(){
		localStorage.setItem('url','/survey-questions-edit')
		localStorage.setItem('form',JSON.stringify(this.surveyQuestionsForm.value));
		this.router.navigateByUrl('/maps');
	  }
}
