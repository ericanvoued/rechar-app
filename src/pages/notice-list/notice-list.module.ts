import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeListPage } from './notice-list';
import {MoreComponent} from "../../components/more/more";

@NgModule({
  declarations: [
    NoticeListPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeListPage),
  ],
  entryComponents:[
    MoreComponent
  ]
})
export class NoticeListPageModule {}
