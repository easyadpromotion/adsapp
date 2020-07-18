import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyadsPage } from './surveyads.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyadsPageRoutingModule {}
