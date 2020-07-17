
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { IonicModule } from '@ionic/angular';

import { CreatePhotoFrameAddPageRoutingModule } from './create-photo-frame-add-routing.module';

import { CreatePhotoFrameAddPage } from './create-photo-frame-add.page';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CreatePhotoFrameAddPageRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [CreatePhotoFrameAddPage]
})
export class CreatePhotoFrameAddPageModule {}

