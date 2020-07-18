import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVideoListPage } from './create-video-list.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVideoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVideoListPageRoutingModule {}
