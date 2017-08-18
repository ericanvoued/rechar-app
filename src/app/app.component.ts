import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform, IonicApp, App, AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GlobalShareProvider} from "../providers/global-share/global-share";
import {Config} from "../config/config";
import {DateFormat} from "../providers/tools/date";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  ft = DateFormat.FormatTime;
  rootPage: any = "LoginPage";
  userTypeMap = Config.userTypeMap;
  gamelistIconMap = Config.gameiconMap;
  @ViewChild(Nav) nav: Nav;

  constructor(public share: GlobalShareProvider,public alertCtrl: AlertController, public app: App, public  ionicApp: IonicApp, public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController,) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.egisterBackButtonAction();
    });
  }

  egisterBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      let activeNav = this.app.getActiveNav();
      if (activeNav.canGoBack()) {
        activeNav.pop();
      } else {
        this.showExit();
      }
    });
  }

  showExit() {
    let confirm = this.alertCtrl.create({
      title: '您需要退出程序吗?',
      buttons: [{
        text: '取消',
        handler: () => console.log('Disagree clicked')
      }, {
          text: '退出',
          handler: () => this.platform.exitApp()
        }]
    });
    confirm.present();
  }

  goUserCenter() {
    this.nav.setRoot('TabHomePage', {pageIndex: 4});
    this.menu.close();
  }


}

