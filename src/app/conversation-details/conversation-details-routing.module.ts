import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationDetailsPage } from './conversation-details.page';

const routes: Routes = [
  {
    path: '',
    component: ConversationDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationDetailsPageRoutingModule {}
