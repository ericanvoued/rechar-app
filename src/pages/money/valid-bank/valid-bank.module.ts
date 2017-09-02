import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ValidBankPage} from './valid-bank';
import {ComponentsModule} from "../../../components/components.module";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";

@NgModule({
  declarations: [
    ValidBankPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ValidBankPage),
  ],
  providers: [BankcardService]
})
export class ValidBankPageModule {
}
