import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyQuestionsListPage } from './survey-questions-list.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyQuestionsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyQuestionsListPageRoutingModule {}
