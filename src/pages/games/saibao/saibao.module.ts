import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaibaoPage } from './saibao';
import {SubBusinessToolProvider} from "./sub-business-tool";
import {SubCameconfigServiceProvider} from "./subCameconfigServiceProvider";
import {GameconfigServiceProvider} from "../../../providers/service/games/gameconfig-service/gameconfig-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {UserbalanceServiceProvider} from "../../../providers/service/userbalance-service/userbalance-service";
import {Gamelist} from "../../../providers/service/games/gamelist-service";
import {BusinessTool} from "../../../providers/tools/business-tool";

@NgModule({
  declarations: [
    SaibaoPage,
  ],
  imports: [
    IonicPageModule.forChild(SaibaoPage),
  ],
  providers: [
    SubBusinessToolProvider,
    SubCameconfigServiceProvider,
    GameconfigServiceProvider,
    BasketServiceProvider,
    UserbalanceServiceProvider,
    Gamelist,
    BusinessTool
  ]
})
export class SaibaoPageModule {}
