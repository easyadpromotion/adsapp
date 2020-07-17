import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowToEarnPageRoutingModule } from './how-to-earn-routing.module';

import { HowToEarnPage } from './how-to-earn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowToEarnPageRoutingModule
  ],
  declarations: [HowToEarnPage]
})
export class HowToEarnPageModule {}
