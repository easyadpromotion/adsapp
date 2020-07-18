import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVideoAddPage } from './create-video-add.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVideoAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVideoAddPageRoutingModule {}
