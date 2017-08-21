import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindBankPage } from './bind-bank';

@NgModule({
  declarations: [
    BindBankPage,
  ],
  imports: [
    IonicPageModule.forChild(BindBankPage),
  ],
})
export class BindBankPageModule {}
