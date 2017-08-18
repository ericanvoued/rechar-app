import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecialOfferPage } from './special-offer';

@NgModule({
  declarations: [
    SpecialOfferPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecialOfferPage),
  ],
})
export class SpecialOfferPageModule {}
