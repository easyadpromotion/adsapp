import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EligibilityCriteriaPageRoutingModule } from './eligibility-criteria-routing.module';

import { EligibilityCriteriaPage } from './eligibility-criteria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EligibilityCriteriaPageRoutingModule
  ],
  declarations: [EligibilityCriteriaPage]
})
export class EligibilityCriteriaPageModule {}
