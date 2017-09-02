import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";
import {HttpClientProvider} from "../providers/http-client/http-client";
import {GlobalShareProvider} from "../providers/global-share/global-share";
import {MyExceptionHandler} from "./MyExceptionHandler";
import {MyPopOverComponent} from "../components/my-pop-over/my-pop-over";

@NgModule({
  declarations: [
    MyApp,
    MyPopOverComponent
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
    MyApp,
    MyPopOverComponent
  ],
  providers: [
    HttpClientProvider,
    GlobalShareProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: MyExceptionHandler}
  ]
})
export class AppModule {

}
