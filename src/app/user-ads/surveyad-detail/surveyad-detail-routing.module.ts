import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyadDetailPage } from './surveyad-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyadDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyadDetailPageRoutingModule {}
