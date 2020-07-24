import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketManagementAddPageRoutingModule } from './ticket-management-add-routing.module';

import { TicketManagementAddPage } from './ticket-management-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketManagementAddPageRoutingModule
  ],
  declarations: [TicketManagementAddPage]
})
export class TicketManagementAddPageModule {}
