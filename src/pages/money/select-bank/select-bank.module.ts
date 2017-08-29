import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectBankPage } from './select-bank';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    SelectBankPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SelectBankPage),
  ],
})
export class SelectBankPageModule {}
