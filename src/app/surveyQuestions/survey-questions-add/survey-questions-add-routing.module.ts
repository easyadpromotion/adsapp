import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyQuestionsAddPage } from './survey-questions-add.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyQuestionsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyQuestionsAddPageRoutingModule {}
