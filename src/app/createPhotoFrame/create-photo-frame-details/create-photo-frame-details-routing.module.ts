import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePhotoFrameDetailsPage } from './create-photo-frame-details.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePhotoFrameDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePhotoFrameDetailsPageRoutingModule {}
