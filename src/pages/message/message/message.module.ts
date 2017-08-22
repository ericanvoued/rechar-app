import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessagePage} from './message';
import {WebsidemessagesService} from "../../../providers/service/websidemessages-service";

@NgModule({
  declarations: [
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
  ],
  providers: [WebsidemessagesService]
})
export class MessagePageModule {
}
