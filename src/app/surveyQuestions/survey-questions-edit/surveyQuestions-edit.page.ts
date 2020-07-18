
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/alert.service';
import { LoaderService } from 'src/app/loader.service';
import { UserService } from 'src/app/user.service';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-surveyQuestions-edit',
  templateUrl: './survey-questions-edit.page.html',
  styleUrls: ['./survey-questions-edit.page.scss'],
})
export class SurveyQuestionsEditPage implements OnInit {
   surveyQuestionsForm: FormGroup;
  editDetails;
  questions=[];
  constructor(private formBuilder:FormBuilder, private router:Router,public loadingCtrl: LoadingController,
    public httpService:HttpServiceService, public alertService:AlertService,public util:UtilService,
    public userService:UserService,
    public loaderService:LoaderService) {
    
  }

  ngOnInit() { this.loaderService.hideLoader();
    this.surveyQuestionsForm = this.formBuilder.group({
      _id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      targetCount: ['', [Validators.required]],
      
      targetAge:['', [Validators.required]],
      targetRadius: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      userId: [this.userService.getUserId(), [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      targetReached: [0, [Validators.required]],
      targetType: ['', [Validators.required]],
      isAvailable: ['', [Validators.required]],
            });
    this.loaderService.showLoader('Please wait while fetching ..').then(()=>{
    
    this.editDetails = JSON.parse(localStorage.getItem('editData'))
    this.surveyQuestionsForm.patchValue(this.editDetails);
    this.questions=this.editDetails['surveyQuestions']; 
    this.loaderService.hideLoader();
  })

  }




  ionViewWillEnter()
  {
    this.surveyQuestionsForm = this.formBuilder.group({
      _id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      targetCount: ['', [Validators.required]],
      
      targetAge:['', [Validators.required]],
      targetRadius: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      userId: [this.userService.getUserId(), [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      targetReached: [0, [Validators.required]],
      targetType: ['', [Validators.required]],
      isAvailable: ['', [Validators.required]],
            });
    this.loaderService.showLoader('Please wait while fetching ..').then(()=>{
    
    this.editDetails = JSON.parse(localStorage.getItem('editData'))
    this.surveyQuestionsForm.patchValue(this.editDetails);
    this.questions=this.editDetails['surveyQuestions']; 
    this.loaderService.hideLoader();
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

  addRadio(tag) {
		tag.push({ radio: '' });
  }
  
  addQuestion() {
		this.questions.push({
			Title: '',
			canSkip: false,
			ResponseType:'radio',
			radio:[{ radio: '' }]
		});

		console.log(this.questions)
		
	}

	deleteQuestion(index) {
		if (this.questions.length > 1) {
			this.questions.splice(index, 1);
		}
	}

  submit(data) {


    if (!this.surveyQuestionsForm.valid) {
			this.util.enableFromValidation(this.surveyQuestionsForm);
			return;
    }
    

    data['updatedAt']=new Date().getTime();
    this.loaderService.showLoader('Updating, please wait').then(()=>{
      try{
        this.httpService.postApi(data, 'surveyQuestions/updateDetails/' + data.id).subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res["success"]) {
            this.alertService.presentAlert('Success','Successfully updated','Okay');
            this.router.navigate(['/surveyQuestions-list'])
          } else {
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

}


