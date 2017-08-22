import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessagePage} from './message';
import {WebsidemessagesService} from "../../../providers/service/websidemessages-service";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    MessagePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MessagePage),
  ],
  providers: [WebsidemessagesService]
})
export class MessagePageModule {
}
