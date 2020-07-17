import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePhotoFrameListPage } from './create-photo-frame-list.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePhotoFrameListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePhotoFrameListPageRoutingModule {}
