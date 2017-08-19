import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalProfilesPage } from './personal-profiles';

@NgModule({
  declarations: [
    PersonalProfilesPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalProfilesPage),
  ],
})
export class PersonalProfilesPageModule {}
