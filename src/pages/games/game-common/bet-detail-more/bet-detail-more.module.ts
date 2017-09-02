import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BetDetailMorePage } from './bet-detail-more';
import {BetrecordDetailService} from "../../../../providers/service/betrecord-service/betrecord-detail-service";

@NgModule({
  declarations: [
    BetDetailMorePage,
  ],
  imports: [
    IonicPageModule.forChild(BetDetailMorePage),
  ],
  providers:[BetrecordDetailService]
})
export class BetDetailMorePageModule {}
