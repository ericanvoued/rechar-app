import { NgModule } from '@angular/core';
import { MoreComponent } from './more/more';
import { MyPopOverComponent } from './my-pop-over/my-pop-over';
@NgModule({
	declarations: [MoreComponent,
    MyPopOverComponent],
	imports: [],
	exports: [MoreComponent,
    MyPopOverComponent]
})
export class ComponentsModule {}
