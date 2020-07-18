import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoadDetailPage } from './videoad-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VideoadDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoadDetailPageRoutingModule {}
