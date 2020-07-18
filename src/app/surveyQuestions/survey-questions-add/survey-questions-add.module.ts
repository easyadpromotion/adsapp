
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { IonicModule } from '@ionic/angular';

import { SurveyQuestionsAddPageRoutingModule } from './survey-questions-add-routing.module';

import { SurveyQuestionsAddPage } from './survey-questions-add.page';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    SurveyQuestionsAddPageRoutingModule
  ],
  declarations: [SurveyQuestionsAddPage]
})
export class SurveyQuestionsAddPageModule {}

