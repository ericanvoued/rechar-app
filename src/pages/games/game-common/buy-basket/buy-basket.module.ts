import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BuyBasketPage} from './buy-basket';
import {BasketServiceProvider} from "../../../../providers/service/games/basket-service/basket-service";
import {UserbalanceServiceProvider} from "../../../../providers/service/userbalance-service/userbalance-service";
import {GameconfigServiceProvider} from "../../../../providers/service/games/gameconfig-service/gameconfig-service";
import {BusinessTool} from "../../../../providers/tools/business-tool";
import {ComponentsModule} from "../../../../components/components.module";

@NgModule({
  declarations: [
    BuyBasketPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyBasketPage),
  ],
  providers: [
    ComponentsModule,
    BasketServiceProvider,
    UserbalanceServiceProvider,
    GameconfigServiceProvider,
    BusinessTool
  ]
})
export class BuyBasketPageModule {
}
