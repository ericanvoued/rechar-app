import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageCataloguePage } from './manage-catalogue';
import {ComponentsModule} from "../../../components/components.module";
import {ModifyPasswordService} from "../../../providers/service/fund-service/modify-password-service";

@NgModule({
  declarations: [
    ManageCataloguePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ManageCataloguePage),
  ],
  providers:[ModifyPasswordService]
})
export class ManageCataloguePageModule {}
