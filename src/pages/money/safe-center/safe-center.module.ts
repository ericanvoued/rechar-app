import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafeCenterPage } from './safe-center';
import {ComponentsModule} from "../../../components/components.module";
import {ModifyPasswordService} from "../../../providers/service/fund-service/modify-password-service";

@NgModule({
  declarations: [
    SafeCenterPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SafeCenterPage),
  ],
  providers:[ModifyPasswordService]
})
export class SafeCenterPageModule {}
