import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BetDatailPage } from './bet-datail';
import {ComponentsModule} from "../../../components/components.module";
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";



@NgModule({
  declarations: [
    BetDatailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BetDatailPage)
  ],
  providers:[HomeServiceProvider,GlobalShareProvider]
})
export class BetDatailPageModule {}
