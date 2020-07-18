import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyQuestionsDetailsPageRoutingModule } from './survey-questions-details-routing.module';

import { SurveyQuestionsDetailsPage } from './survey-questions-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyQuestionsDetailsPageRoutingModule
  ],
  declarations: [SurveyQuestionsDetailsPage]
})
export class SurveyQuestionsDetailsPageModule {}
