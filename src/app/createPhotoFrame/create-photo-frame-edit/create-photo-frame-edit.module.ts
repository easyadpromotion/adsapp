import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePhotoFrameEditPageRoutingModule } from './create-photo-frame-edit-routing.module';

import { CreatePhotoFrameEditPage } from './create-photo-frame-edit.page';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreatePhotoFrameEditPageRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [CreatePhotoFrameEditPage]
})
export class CreatePhotoFrameEditPageModule {}
