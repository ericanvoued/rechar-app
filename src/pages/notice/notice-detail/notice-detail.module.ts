import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeDetailPage } from './notice-detail';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    NoticeDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(NoticeDetailPage),
  ],
  providers:[HomeServiceProvider],
  entryComponents:[
  ]
})
export class NoticeDetailPageModule {}
