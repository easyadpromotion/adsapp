import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePhotoFrameDetailsPageRoutingModule } from './create-photo-frame-details-routing.module';

import { CreatePhotoFrameDetailsPage } from './create-photo-frame-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePhotoFrameDetailsPageRoutingModule
  ],
  declarations: [CreatePhotoFrameDetailsPage]
})
export class CreatePhotoFrameDetailsPageModule {}
