import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalProfilesPage } from './personal-profiles';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    PersonalProfilesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PersonalProfilesPage),
  ],
  providers:[]
})
export class PersonalProfilesPageModule {}
