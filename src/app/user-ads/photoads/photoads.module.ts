import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoadsPageRoutingModule } from './photoads-routing.module';

import { PhotoadsPage } from './photoads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoadsPageRoutingModule
  ],
  declarations: [PhotoadsPage]
})
export class PhotoadsPageModule {}
