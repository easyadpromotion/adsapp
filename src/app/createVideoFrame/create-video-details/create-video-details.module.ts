import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateVideoDetailsPageRoutingModule } from './create-video-details-routing.module';

import { CreateVideoDetailsPage } from './create-video-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateVideoDetailsPageRoutingModule
  ],
  declarations: [CreateVideoDetailsPage]
})
export class CreateVideoDetailsPageModule {}
