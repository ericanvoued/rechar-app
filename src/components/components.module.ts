import {NgModule} from '@angular/core';
import {MyPopOverComponent} from './my-pop-over/my-pop-over';
import {MoresComponent} from './mores/mores';
import { NoDataRemindComponent } from './no-data-remind/no-data-remind';
@NgModule({
  declarations: [
    MyPopOverComponent,
    MoresComponent,
    NoDataRemindComponent],
  imports: [],
  exports: [
    MyPopOverComponent,
    MoresComponent,
    NoDataRemindComponent]
})
export class ComponentsModule {
}
