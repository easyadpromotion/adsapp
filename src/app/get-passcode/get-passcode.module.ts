import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { IonicModule } from '@ionic/angular';

import { GetPasscodePage } from './get-passcode.page';

const routes: Routes = [
  {
    path: '',
    component: GetPasscodePage
  }
];

@NgModule({
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBu6TgVVKcMEJl66ub2M1igelUXZKlT6lg'
        }),
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
  declarations: [GetPasscodePage]
})
export class GetPasscodePageModule {}
