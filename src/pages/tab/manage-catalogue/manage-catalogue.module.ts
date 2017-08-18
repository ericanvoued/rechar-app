import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageCataloguePage } from './manage-catalogue';

@NgModule({
  declarations: [
    ManageCataloguePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageCataloguePage),
  ],
})
export class ManageCataloguePageModule {}
