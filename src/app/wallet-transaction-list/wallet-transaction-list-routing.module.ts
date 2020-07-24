import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletTransactionListPage } from './wallet-transaction-list.page';

const routes: Routes = [
  {
    path: '',
    component: WalletTransactionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletTransactionListPageRoutingModule {}
