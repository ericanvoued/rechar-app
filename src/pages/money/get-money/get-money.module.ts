import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetMoneyPage } from './get-money';
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    GetMoneyPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(GetMoneyPage),
  ],
  providers:[MoneySericeProvider],
  entryComponents:[
  ]
})
export class GetMoneyPageModule {}
