import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectBankPage } from './select-bank';

@NgModule({
  declarations: [
    SelectBankPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectBankPage),
  ],
})
export class SelectBankPageModule {}
