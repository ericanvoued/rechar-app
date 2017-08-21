import {NgModule} from '@angular/core';
import {MyPopOverComponent} from './my-pop-over/my-pop-over';
import {MoresComponent} from './mores/mores';
import {NoDataRemindComponent} from './no-data-remind/no-data-remind';
import {GamerecordComponent} from './gamerecord/gamerecord';


@NgModule({
  declarations: [
    MyPopOverComponent,
    MoresComponent,
    NoDataRemindComponent,
    GamerecordComponent,
  ],
  imports: [],
  exports: [
    MyPopOverComponent,
    MoresComponent,
    NoDataRemindComponent,
    GamerecordComponent,
  ]
})
export class ComponentsModule {
}
