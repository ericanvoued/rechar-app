import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameRecordPage } from './game-record';
import {ComponentsModule} from "../../../components/components.module";
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";

@NgModule({
  declarations: [
    GameRecordPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(GameRecordPage),
  ],
  providers:[HomeServiceProvider],
  entryComponents:[
  ]
})
export class GameRecordPageModule {
}
