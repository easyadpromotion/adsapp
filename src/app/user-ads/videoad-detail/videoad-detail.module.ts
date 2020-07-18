import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoadDetailPageRoutingModule } from './videoad-detail-routing.module';

import { VideoadDetailPage } from './videoad-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoadDetailPageRoutingModule
  ],
  declarations: [VideoadDetailPage]
})
export class VideoadDetailPageModule {}
