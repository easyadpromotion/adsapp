import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletHistoryDetailsPage } from './wallet-history-details.page';

const routes: Routes = [
  {
    path: '',
    component: WalletHistoryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletHistoryDetailsPageRoutingModule {}
