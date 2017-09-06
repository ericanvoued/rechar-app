import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechargeDetailPage } from './recharge-detail';
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";
import {ComponentsModule} from "../../../components/components.module";
import {MydepositService} from "../../../providers/service/bank-mix/mydeposit-service";


@NgModule({
  declarations: [
    RechargeDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RechargeDetailPage),
  ],
  providers:[MoneySericeProvider,MydepositService],
  entryComponents:[
  ]
})
export class RechargeDetailPageModule {}
