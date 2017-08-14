import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {LoginServiceProvider} from "../../providers/service/login-serice/login-service";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  providers:[LoginServiceProvider]
})
export class LoginPageModule {}
