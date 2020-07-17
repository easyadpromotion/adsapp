import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePhotoFrameEditPage } from './create-photo-frame-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePhotoFrameEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePhotoFrameEditPageRoutingModule {}
