import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidBankPage } from './valid-bank';

@NgModule({
  declarations: [
    ValidBankPage,
  ],
  imports: [
    IonicPageModule.forChild(ValidBankPage),
  ],
})
export class ValidBankPageModule {}
