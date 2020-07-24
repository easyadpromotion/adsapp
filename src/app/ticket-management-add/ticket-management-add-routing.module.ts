import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketManagementAddPage } from './ticket-management-add.page';

const routes: Routes = [
  {
    path: '',
    component: TicketManagementAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketManagementAddPageRoutingModule {}
