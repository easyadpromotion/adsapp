import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyadsPageRoutingModule } from './surveyads-routing.module';

import { SurveyadsPage } from './surveyads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyadsPageRoutingModule
  ],
  declarations: [SurveyadsPage]
})
export class SurveyadsPageModule {}
