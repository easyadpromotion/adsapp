import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EligibilityCriteriaPage } from './eligibility-criteria.page';

const routes: Routes = [
  {
    path: '',
    component: EligibilityCriteriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EligibilityCriteriaPageRoutingModule {}
