import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePhotoFrameAddPage } from './create-photo-frame-add.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePhotoFrameAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePhotoFrameAddPageRoutingModule {}
