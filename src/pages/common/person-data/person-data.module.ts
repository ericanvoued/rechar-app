import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonDataPage } from './person-data';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    PersonDataPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PersonDataPage),
  ]
})
export class PersonDataPageModule {}
