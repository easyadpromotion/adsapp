import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyQuestionsEditPageRoutingModule } from './survey-questions-edit-routing.module';

import { SurveyQuestionsEditPage } from './survey-questions-edit.page';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyQuestionsEditPageRoutingModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [SurveyQuestionsEditPage]
})
export class SurveyQuestionsEditPageModule {}
