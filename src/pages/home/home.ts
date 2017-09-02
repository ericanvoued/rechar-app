import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HomeServiceProvider} from "../../providers/service/home-service/home-service";
import {Config} from "../../config/config";
import {Effect} from "./effect";
import {BalanceProvider} from "../../providers/service/balance/balance";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ccc: boolean;
  cccInterval: any;
  gamelistIconMap = Config.gameiconMap;

  constructor(public balance:BalanceProvider,public navCtrl: NavController, public navParams: NavParams, public homeService: HomeServiceProvider,public toastCtrl: ToastController) {
    (new Effect()).initEffect();
    this.balance.getUserBalance();
    this.homeService.getRemoteServer();
    this.homeService.getBannerRemoteServer();
    this.homeService.postLotteryServer();
    clearInterval(this.cccInterval);
    this.cccInterval = setInterval(() => {
      this.ccc = !this.ccc;
    }, 1000);
  }

  gameRecordFetch() {
    return this.homeService.postRemoteServer();
  }

  playGame(gameNav,toPage): void {
    console.log("gameNav:",gameNav);
    if (!gameNav.time) {
      let toast = this.toastCtrl.create({
        message: "即将上线",
        duration: 1000,
        position: 'middle'
      });
      toast.present();
      return;
    }
    if(toPage) this.navCtrl.push(toPage,{nav: gameNav})
  }

  pushPage(page){
    if(page) this.navCtrl.push(page);
  }
}
