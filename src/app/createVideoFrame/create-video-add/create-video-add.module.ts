
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IonicModule } from '@ionic/angular';

import { CreateVideoAddPageRoutingModule } from './create-video-add-routing.module';

import { CreateVideoAddPage } from './create-video-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CreateVideoAddPageRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [CreateVideoAddPage]
})
export class CreateVideoAddPageModule {}

