import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechargePage } from './recharge';
import {TopupServiceProvider} from "../../../providers/service/bank-mix/topup-service/topup-service";

@NgModule({
  declarations: [
    RechargePage,
  ],
  imports: [
    IonicPageModule.forChild(RechargePage),
  ],
  providers:[TopupServiceProvider]
})
export class RechargePageModule {}
