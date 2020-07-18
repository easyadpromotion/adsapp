import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVideoEditPage } from './create-video-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVideoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVideoEditPageRoutingModule {}
