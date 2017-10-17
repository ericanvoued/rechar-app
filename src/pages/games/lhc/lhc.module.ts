import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LhcPage } from './lhc';

import {GameconfigServiceProvider} from "../../../providers/service/games/gameconfig-service/gameconfig-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {ComponentsModule} from "../../../components/components.module";
import {BusinessTool} from "../../../providers/tools/business-tool";

@NgModule({
  declarations: [
    LhcPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LhcPage),
  ],
  providers: [
    GameconfigServiceProvider,
    BasketServiceProvider,
    BusinessTool
  ]
})
export class LhcPageModule {}
