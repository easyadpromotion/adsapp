import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletHistoryDetailsPageRoutingModule } from './wallet-history-details-routing.module';

import { WalletHistoryDetailsPage } from './wallet-history-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletHistoryDetailsPageRoutingModule
  ],
  declarations: [WalletHistoryDetailsPage]
})
export class WalletHistoryDetailsPageModule {}
