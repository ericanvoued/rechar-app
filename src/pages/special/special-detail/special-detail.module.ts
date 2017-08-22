import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecialDetailPage } from './special-detail';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    SpecialDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SpecialDetailPage),
  ],
  providers:[HomeServiceProvider]
})
export class SpecialDetailPageModule {}
