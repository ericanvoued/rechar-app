import {NgModule} from '@angular/core';
import {MoresComponent} from './mores/mores';
import {NoDataRemindComponent} from './no-data-remind/no-data-remind';



@NgModule({
  declarations: [
    MoresComponent,
    NoDataRemindComponent
  ],
  imports: [],
  exports: [
    MoresComponent,
    NoDataRemindComponent
  ]
})
export class ComponentsModule {
}
