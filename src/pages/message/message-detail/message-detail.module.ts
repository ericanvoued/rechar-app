import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDetailPage } from './message-detail';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";

@NgModule({
  declarations: [
    MessageDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageDetailPage),
  ],
  providers:[HomeServiceProvider]
})
export class MessageDetailPageModule {}
