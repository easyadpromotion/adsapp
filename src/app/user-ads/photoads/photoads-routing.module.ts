import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoadsPage } from './photoads.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoadsPageRoutingModule {}
