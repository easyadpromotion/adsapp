import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyQuestionsListPageRoutingModule } from './survey-questions-list-routing.module';

import { SurveyQuestionsListPage } from './survey-questions-list.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    SurveyQuestionsListPageRoutingModule
  ],
  declarations: [SurveyQuestionsListPage]
})
export class SurveyQuestionsListPageModule {}
