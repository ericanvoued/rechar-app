import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyBasketPage } from './buy-basket';

@NgModule({
  declarations: [
    BuyBasketPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyBasketPage),
  ],
})
export class BuyBasketPageModule {}
