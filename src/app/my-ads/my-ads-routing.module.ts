import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyADsPage } from './my-ads.page';

const routes: Routes = [
  {
    path: '',
    component: MyADsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyADsPageRoutingModule {}
