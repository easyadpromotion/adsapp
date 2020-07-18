import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoadDetailPageRoutingModule } from './photoad-detail-routing.module';

import { PhotoadDetailPage } from './photoad-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoadDetailPageRoutingModule
  ],
  declarations: [PhotoadDetailPage]
})
export class PhotoadDetailPageModule {}
