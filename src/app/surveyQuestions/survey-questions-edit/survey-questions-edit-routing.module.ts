import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyQuestionsEditPage } from './survey-questions-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyQuestionsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyQuestionsEditPageRoutingModule {}
