import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetMoneyPage } from './get-money';
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";
import {ComponentsModule} from "../../../components/components.module";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";

@NgModule({
  declarations: [
    GetMoneyPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(GetMoneyPage),
  ],
  providers:[MoneySericeProvider,BankcardService],
  entryComponents:[
  ]
})
export class GetMoneyPageModule {}
