import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {JsksPage} from './jsks';
import {GameconfigServiceProvider} from "../../../providers/service/games/gameconfig-service/gameconfig-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
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
    BusinessTool
  ]
})
export class JsksPageModule {
}
