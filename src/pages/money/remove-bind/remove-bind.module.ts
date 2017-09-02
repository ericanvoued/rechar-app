import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemoveBindPage } from './remove-bind';
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";

@NgModule({
  declarations: [
    RemoveBindPage,
  ],
  imports: [
    IonicPageModule.forChild(RemoveBindPage),
  ],
  providers:[BankcardService]
})
export class RemoveBindPageModule {}
