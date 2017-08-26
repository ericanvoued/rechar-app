import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BetDetailMorePage } from './bet-detail-more';
import {BetrecordDetailService} from "../../../../providers/service/betrecord-service/betrecord-detail-service";
import {ComponentsModule} from "../../../../components/components.module";

@NgModule({
  declarations: [
    BetDetailMorePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BetDetailMorePage),
  ],
  providers:[BetrecordDetailService]
})
export class BetDetailMorePageModule {}
