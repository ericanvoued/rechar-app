import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {HomeServiceProvider} from "../../providers/service/home-service/home-service";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  providers:[
    HomeServiceProvider
  ]
})
export class HomePageModule {}
