import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechargePage } from './recharge';
import {ComponentsModule} from "../../../components/components.module";
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";

@NgModule({
  declarations: [
    RechargePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RechargePage),
  ],
  providers:[HomeServiceProvider],
  entryComponents:[
  ]
})
export class RechargePageModule {}
