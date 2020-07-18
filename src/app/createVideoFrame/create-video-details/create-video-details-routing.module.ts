import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVideoDetailsPage } from './create-video-details.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVideoDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVideoDetailsPageRoutingModule {}
