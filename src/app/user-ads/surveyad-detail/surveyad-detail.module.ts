import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyadDetailPageRoutingModule } from './surveyad-detail-routing.module';

import { SurveyadDetailPage } from './surveyad-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyadDetailPageRoutingModule
  ],
  declarations: [SurveyadDetailPage]
})
export class SurveyadDetailPageModule {}
