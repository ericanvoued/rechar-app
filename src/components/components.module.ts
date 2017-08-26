import {NgModule} from '@angular/core';
import {MoresComponent} from './mores/mores';
import {NoDataRemindComponent} from './no-data-remind/no-data-remind';
import {GamerecordComponent} from './gamerecord/gamerecord';


@NgModule({
  declarations: [
    MoresComponent,
    NoDataRemindComponent,
    GamerecordComponent,
  ],
  imports: [],
  exports: [
    MoresComponent,
    NoDataRemindComponent,
    GamerecordComponent,
  ]
})
export class ComponentsModule {
}
