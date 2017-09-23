import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomeServiceProvider} from "../../providers/service/home-service/home-service";
import {Config} from "../../config/config";
import {Effect} from "./effect";
import {BalanceProvider} from "../../providers/service/balance/balance";
import {GlobalShareProvider} from "../../providers/global-share/global-share";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ccc: boolean;
  cccInterval: any;
  getRecord: any;
  gamelistIconMap = Config.gameiconMap;

  constructor(public share: GlobalShareProvider, public balance: BalanceProvider, public navCtrl: NavController, public navParams: NavParams, public homeService: HomeServiceProvider) {
    (new Effect()).initEffect();
    this.balance.getUserBalance();
    this.homeService.getRemoteServer();
    this.homeService.getBannerRemoteServer();
    this.homeService.postLotteryServer();
    clearInterval(this.cccInterval);
    this.cccInterval = setInterval(() => this.ccc = !this.ccc, 1000);
  }

  gameRecordFetch() {
    return this.homeService.postRemoteServer();
  }

  async playGame(gameNav, toPage) {
    if (!gameNav.time) {
      this.share.showToast('即将上线', 1000);
      return;
    }
    if (toPage) {
      if (/k3$/i.test(gameNav.nav)) {
        toPage = 'JsksPage';
      } else if (/SSC|11Y$/i.test(gameNav.nav)) {
        toPage = 'CqsscPage';
      } else if (/K10$/i.test(gameNav.nav)) {
        toPage = 'Pk10Page';
      } else if (/DICE$/i.test(gameNav.nav)) {
        toPage = 'SaibaoPage';
      }
      this.navCtrl.push(toPage, {nav: gameNav});
      this.getRecord = await this.homeService.postRemoteServer();
    }
  }

  pushPage(page) {
    if (page) this.navCtrl.push(page);
  }
}
