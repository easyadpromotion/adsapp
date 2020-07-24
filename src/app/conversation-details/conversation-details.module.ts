import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationDetailsPageRoutingModule } from './conversation-details-routing.module';

import { ConversationDetailsPage } from './conversation-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversationDetailsPageRoutingModule
  ],
  declarations: [ConversationDetailsPage]
})
export class ConversationDetailsPageModule {}
