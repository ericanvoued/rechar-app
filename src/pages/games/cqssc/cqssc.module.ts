import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CqsscPage} from './cqssc';
import {GameconfigServiceProvider} from "../../../providers/service/games/gameconfig-service/gameconfig-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {ComponentsModule} from "../../../components/components.module";
import {UserbalanceServiceProvider} from "../../../providers/service/userbalance-service/userbalance-service";
import {BusinessTool} from "../../../providers/tools/business-tool";

@NgModule({
  declarations: [
    CqsscPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CqsscPage),
  ],
  providers: [
    GameconfigServiceProvider,
    BasketServiceProvider,
    UserbalanceServiceProvider,
    BusinessTool
  ]
})
export class CqsscPageModule {
}
