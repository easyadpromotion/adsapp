import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletTransactionListPageRoutingModule } from './wallet-transaction-list-routing.module';

import { WalletTransactionListPage } from './wallet-transaction-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletTransactionListPageRoutingModule
  ],
  declarations: [WalletTransactionListPage]
})
export class WalletTransactionListPageModule {}
