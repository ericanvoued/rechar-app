import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalProfilesPage } from './personal-profiles';
import {ComponentsModule} from "../../../components/components.module";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";

@NgModule({
  declarations: [
    PersonalProfilesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PersonalProfilesPage),
  ],
  providers:[BankcardService]
})
export class PersonalProfilesPageModule {}
