import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeListPage } from './notice-list';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    NoticeListPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(NoticeListPage),
  ],
  providers:[HomeServiceProvider],
  entryComponents:[
  ]
})
export class NoticeListPageModule {}
