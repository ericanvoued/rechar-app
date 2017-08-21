import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CqsscPage } from './cqssc';
import {GamerecordComponent} from "../../../components/gamerecord/gamerecord";

@NgModule({
  declarations: [
    CqsscPage,
  ],
  imports: [
    GamerecordComponent,
    IonicPageModule.forChild(CqsscPage),
  ],
})
export class CqsscPageModule {}
