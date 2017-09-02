import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectBankPage } from './select-bank';
import {ComponentsModule} from "../../../components/components.module";
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
@NgModule({
  declarations: [
    SelectBankPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SelectBankPage),
  ],
  providers:[MoneySericeProvider,GlobalShareProvider]
})
export class SelectBankPageModule {}
