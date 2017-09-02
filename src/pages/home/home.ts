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
  gamelistIconMap = Config.gameiconMap;

  constructor(public share:GlobalShareProvider,public balance:BalanceProvider,public navCtrl: NavController, public navParams: NavParams, public homeService: HomeServiceProvider) {
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

  playGame(gameNav,toPage): void {
    console.log("gameNav:",gameNav);
    if (!gameNav.time) {
      this.share.showToast('即将上线',1000);
      return;
    }
    if(toPage) this.navCtrl.push(toPage,{nav: gameNav})
  }

  pushPage(page){
    if(page) this.navCtrl.push(page);
  }
}
