import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyADsPageRoutingModule } from './my-ads-routing.module';

import { MyADsPage } from './my-ads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyADsPageRoutingModule
  ],
  declarations: [MyADsPage]
})
export class MyADsPageModule {}
