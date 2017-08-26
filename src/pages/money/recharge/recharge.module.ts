import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {RechargePage} from './recharge';
import {TopupServiceProvider} from "../../../providers/service/bank-mix/topup-service/topup-service";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    RechargePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RechargePage),
  ],
  providers: [TopupServiceProvider]
})
export class RechargePageModule {
}
