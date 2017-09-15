import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform, IonicApp, App} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GlobalShareProvider} from "../providers/global-share/global-share";
import {Config} from "../config/config";
import {DateFormat} from "../providers/tools/date";

@Component({
  templateUrl: '../pages/games/saibao/saibao.html'
})
export class MyApp {
  ft = DateFormat.FormatTime;
  rootPage: any = "LoginPage";
  userTypeMap = Config.userTypeMap;
  gamelistIconMap = Config.gameiconMap;
  @ViewChild(Nav) nav: Nav;
  statusName = {0: '待开奖', 1: '已撤销', 2: '未中奖', 3: '已中奖', 4: '已派奖', 5: '系统撤销'};
  yearReg = /[\d]{4}-/;

  constructor(public share: GlobalShareProvider, public app: App, public  ionicApp: IonicApp, public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController) {
    platform.ready().then(() => {
      if (!(/^#(\/login|\/tmp)/.test(location.hash) || /^#\/tmp/.test(location.hash))) {
        setTimeout(v => this.nav.setRoot('LoginPage'), 500);
      }
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
    this.share.showAlert('您需要退出程序吗?',
      [{text: '取消', handler: () => console.log('Disagree clicked')},
        {text: '退出', handler: () => this.platform.exitApp()}]);
  }

  playGame(gameNav, toPage): void {
    if (!gameNav.time) {
      this.share.showToast('即将上线',1000);
      return;
    }
    this.menu.close();
    if (toPage) {
      if (/k3$/i.test(gameNav.nav)) {
        toPage = 'JsksPage';
      } else if (/SSC|11Y$/i.test(gameNav.nav)) {
        toPage = 'CqsscPage';
      } else if (/K10$/i.test(gameNav.nav)) {
        toPage = 'Pk10Page';
      }
      this.nav.push(toPage, {nav: gameNav})
    }
  }

  goPage(page, parameter, how?) {
    if (page) {
      this.menu.close();
      if (how) {
        this.nav.push(page, parameter);
      } else {
        this.nav.setRoot(page, parameter);
      }
    }
  }
}

