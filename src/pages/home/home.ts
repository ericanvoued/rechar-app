import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HomeServiceProvider} from "../../providers/service/home-service/home-service";
import {CqsscPage} from "../cqssc/cqssc";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  balance: any;
  notice:any;
  ccc: boolean;
  cccInterval: any;
  banners: any;
  lottery:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public homeService: HomeServiceProvider,public toastCtrl: ToastController) {
    this.balance = this.homeService.getUserBalance();
    this.notice=this.homeService.getRemoteServer();
    this.banners=this.homeService.getBannerRemoteServer();
    this.lottery=this.homeService.postLotteryServer();
    clearInterval(this.cccInterval);
    this.cccInterval = setInterval(() => {
      this.ccc = !this.ccc;
    }, 1000);

  }

  gameRecordFetch() {
    return this.homeService.postRemoteServer();
  }

  playGame(gameNav): void {
    if (!gameNav.time) {
      let toast = this.toastCtrl.create({
        message: "即将上线",
        duration: 1000,
        position: 'middle'
      });
      toast.present();
      return;
    }
    this.navCtrl.push(CqsscPage, {nav: gameNav})
  }
}
