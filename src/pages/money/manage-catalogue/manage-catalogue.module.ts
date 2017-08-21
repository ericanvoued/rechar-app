import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageCataloguePage } from './manage-catalogue';
import {ComponentsModule} from "../../../components/components.module";
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";

@NgModule({
  declarations: [
    ManageCataloguePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ManageCataloguePage),
  ],
  providers:[MoneySericeProvider],
  entryComponents:[
  ]
})
export class ManageCataloguePageModule {}
