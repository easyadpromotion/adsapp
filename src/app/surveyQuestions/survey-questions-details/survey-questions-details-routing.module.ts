import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyQuestionsDetailsPage } from './survey-questions-details.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyQuestionsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyQuestionsDetailsPageRoutingModule {}
