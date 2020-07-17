import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicModule } from '@ionic/angular';

import { CreatePhotoFrameListPageRoutingModule } from './create-photo-frame-list-routing.module';

import { CreatePhotoFrameListPage } from './create-photo-frame-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    CreatePhotoFrameListPageRoutingModule
  ],
  declarations: [CreatePhotoFrameListPage]
})
export class CreatePhotoFrameListPageModule {}
