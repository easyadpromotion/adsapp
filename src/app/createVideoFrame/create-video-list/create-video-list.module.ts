import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicModule } from '@ionic/angular';

import { CreateVideoListPageRoutingModule } from './create-video-list-routing.module';

import { CreateVideoListPage } from './create-video-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    CreateVideoListPageRoutingModule
  ],
  declarations: [CreateVideoListPage]
})
export class CreateVideoListPageModule {}
