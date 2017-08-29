import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindBankPage } from './bind-bank';
import {ComponentsModule} from "../../../components/components.module";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";

@NgModule({
  declarations: [
    BindBankPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BindBankPage),
  ],
  providers:[BankcardService]
})
export class BindBankPageModule {}
