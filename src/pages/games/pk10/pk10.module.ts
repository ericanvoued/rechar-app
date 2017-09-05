import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {Pk10Page} from './pk10';
import {GameconfigServiceProvider} from "../../../providers/service/games/gameconfig-service/gameconfig-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {UserbalanceServiceProvider} from "../../../providers/service/userbalance-service/userbalance-service";
import {BusinessTool} from "../../../providers/tools/business-tool";
import {Gamelist} from "../../../providers/service/games/gamelist-service";

@NgModule({
  declarations: [
    Pk10Page,
  ],
  imports: [
    IonicPageModule.forChild(Pk10Page),
  ],
  providers: [
    GameconfigServiceProvider,
    BasketServiceProvider,
    UserbalanceServiceProvider,
    BusinessTool,
    Gamelist
  ]
})
export class Pk10PageModule {
}
