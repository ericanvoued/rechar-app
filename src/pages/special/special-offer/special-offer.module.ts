import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecialOfferPage } from './special-offer';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    SpecialOfferPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SpecialOfferPage),
  ],
  providers:[HomeServiceProvider]
})
export class SpecialOfferPageModule {}
