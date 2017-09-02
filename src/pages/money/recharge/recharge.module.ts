import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { RechargePage } from './recharge';
import {ComponentsModule} from "../../../components/components.module";
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";

@NgModule({
  declarations: [
    RechargePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RechargePage),
  ],
  providers:[MoneySericeProvider],
  entryComponents:[
  ]
})
export class RechargePageModule {}
