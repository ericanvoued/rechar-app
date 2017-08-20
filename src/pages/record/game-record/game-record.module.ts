import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { GameRecordPage } from './game-record';
import {ComponentsModule} from "../../../components/components.module";
import {BetrecordServiceProvider} from "../../../providers/service/betrecord-service/betrecord-service";

@NgModule({
  declarations: [
    GameRecordPage,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(GameRecordPage),
  ],
  providers:[BetrecordServiceProvider],
  entryComponents:[
  ]
})
export class GameRecordPageModule {}
