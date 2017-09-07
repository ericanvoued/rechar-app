import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {JsksPage} from './jsks';
import {GameconfigServiceProvider} from "../../../providers/service/games/gameconfig-service/gameconfig-service";
import {UserbalanceServiceProvider} from "../../../providers/service/userbalance-service/userbalance-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {Gamelist} from "../../../providers/service/games/gamelist-service";
import {SubBusinessToolProvider} from "./sub-business-tool";
import {BusinessTool} from "../../../providers/tools/business-tool";
import {SubCameconfigServiceProvider} from "./subCameconfigServiceProvider";

@NgModule({
  declarations: [
    JsksPage,
  ],
  imports: [
    IonicPageModule.forChild(JsksPage),
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
export class JsksPageModule {
}
