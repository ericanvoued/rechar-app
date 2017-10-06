import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {Pk10Page} from './pk10';
import {GameconfigServiceProvider} from "../../../providers/service/games/gameconfig-service/gameconfig-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {BusinessTool} from "../../../providers/tools/business-tool";
import {SubBusinessToolProvider} from "./sub-business-tool";
import {SubCameconfigServiceProvider} from "./subCameconfigServiceProvider";

@NgModule({
  declarations: [
    Pk10Page,
  ],
  imports: [
    IonicPageModule.forChild(Pk10Page),
  ],
  providers: [
    SubBusinessToolProvider,
    SubCameconfigServiceProvider,
    GameconfigServiceProvider,
    BasketServiceProvider,
    BusinessTool
]})

export class Pk10PageModule {
}
