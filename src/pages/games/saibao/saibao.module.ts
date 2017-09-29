import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaibaoPage } from './saibao';
import {SubBusinessToolProvider} from "./sub-business-tool";
import {SubCameconfigServiceProvider} from "./subCameconfigServiceProvider";
import {GameconfigServiceProvider} from "../../../providers/service/games/gameconfig-service/gameconfig-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {BusinessTool} from "../../../providers/tools/business-tool";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    SaibaoPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SaibaoPage),
  ],
  providers: [
    SubBusinessToolProvider,
    SubCameconfigServiceProvider,
    GameconfigServiceProvider,
    BasketServiceProvider,
    BusinessTool
  ]
})
export class SaibaoPageModule {}
