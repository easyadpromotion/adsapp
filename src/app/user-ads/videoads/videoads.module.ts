import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoadsPageRoutingModule } from './videoads-routing.module';

import { VideoadsPage } from './videoads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoadsPageRoutingModule
  ],
  declarations: [VideoadsPage]
})
export class VideoadsPageModule {}
