import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBankPage } from './add-bank';
import {ComponentsModule} from "../../../components/components.module";
import {SetfundpasswordService} from "../../../providers/service/fund-service/setfundpassword-service";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";

@NgModule({
  declarations: [
    AddBankPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AddBankPage),
  ],
  providers:[SetfundpasswordService,BankcardService]
})
export class AddBankPageModule {}
