import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowToEarnPage } from './how-to-earn.page';

const routes: Routes = [
  {
    path: '',
    component: HowToEarnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowToEarnPageRoutingModule {}
