import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateVideoEditPageRoutingModule } from './create-video-edit-routing.module';

import { CreateVideoEditPage } from './create-video-edit.page';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateVideoEditPageRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [CreateVideoEditPage]
})
export class CreateVideoEditPageModule {}
