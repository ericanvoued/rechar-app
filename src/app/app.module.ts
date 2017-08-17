import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";
import {HttpClientProvider} from "../providers/http-client/http-client";
import {GlobalShareProvider} from "../providers/global-share/global-share";
import { GameconfigServiceProvider } from '../providers/gameconfig-service/gameconfig-service';
import { BasketServiceProvider } from '../providers/basket-service/basket-service';
import { BankcardServiceProvider } from '../providers/bankcard-service/bankcard-service';
import { ModifyPasswordServiceProvider } from '../providers/modify-password-service/modify-password-service';
import { SetfundpasswordServiceProvider } from '../providers/setfundpassword-service/setfundpassword-service';
import { TopupServiceProvider } from '../providers/topup-service/topup-service';
import { UserbalanceServiceProvider } from '../providers/userbalance-service/userbalance-service';
import { WebsidemessagesServiceProvider } from '../providers/websidemessages-service/websidemessages-service';

@NgModule({
  declarations: [
    MyApp
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios',
      mode: 'ios',
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    HttpClientProvider,
    GlobalShareProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GameconfigServiceProvider,
    BasketServiceProvider,
    BankcardServiceProvider,
    ModifyPasswordServiceProvider,
    SetfundpasswordServiceProvider,
    TopupServiceProvider,
    UserbalanceServiceProvider,
    WebsidemessagesServiceProvider
  ]
})
export class AppModule {
}
