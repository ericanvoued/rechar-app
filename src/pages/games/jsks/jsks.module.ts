import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JsksPage } from './jsks';

@NgModule({
  declarations: [
    JsksPage,
  ],
  imports: [
    IonicPageModule.forChild(JsksPage),
  ],
})
export class JsksPageModule {}
