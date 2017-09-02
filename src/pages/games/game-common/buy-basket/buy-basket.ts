import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {Effect} from "./effect";
import {GameconfigServiceProvider} from "../../../../providers/service/games/gameconfig-service/gameconfig-service";
import {BasketServiceProvider} from "../../../../providers/service/games/basket-service/basket-service";
import {UserbalanceServiceProvider} from "../../../../providers/service/userbalance-service/userbalance-service";
import {GlobalShareProvider} from "../../../../providers/global-share/global-share";

/**
 * Generated class for the BuyBasketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-basket',
  templateUrl: 'buy-basket.html',
})
export class BuyBasketPage extends Effect {
  constructor(private share:GlobalShareProvider,public navCtrl: NavController, public basket: BasketServiceProvider, public userbalance: UserbalanceServiceProvider, public alertCtrl: AlertController, public gameconfig: GameconfigServiceProvider) {
    super();
  }

  ionViewDidLoad() {
    this.initEffect();
    this.userbalance.getBalaceAgain();
    this.basket.setcustomprizeGroupchoose = this.basket.customprizeGroupchoose = this.gameconfig.defaultData.data.bet_max_prize_group;
    this.setPriceChooseOptions();
  }

  mutiplePluse() {
    this.share.globalData.globalMutile++;
  }

  tracePluse() {
    this.share.globalData.trace++;
  }

  traceReduce() {
    this.share.globalData.trace--;
    this.share.globalData.trace = Math.max(this.share.globalData.trace, 1);
  }

  mutipleReduce() {
    this.share.globalData.globalMutile--;
    this.share.globalData.globalMutile = Math.max(this.share.globalData.globalMutile, 1);
  }

  tracepluseOrmindusOnInput = debounce((e) => {
    this.tracepluseOrmindus(e);
  }, 1000);

  tracepluseOrmindus(e) {
    let v = +e.target.value;
    if (v <= 1) {
      this.share.globalData.trace = 1;
    } else if (v >= 999) {
      this.share.globalData.trace = 999;
    } else {
      this.share.globalData.trace = v;
    }
    e.target.value = this.share.globalData.trace;

  }

  async submit() {
    if (this.share.balance.available < this.basket.totalAllCount) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: '您的余额不足,请先充值',
        buttons: ['好']
      });
      alert.present();
    } else {

      this.basket.submit(this);
    }
  }

  mutiplepluseOrmindusOnInput = debounce((e) => {
    this.mutiplepluseOrmindus(e);
  }, 1000);

  mutiplepluseOrmindus(e) {
    let v = +e.target.value;
    if (v <= 1) {
      this.share.globalData.globalMutile = 1;
    } else if (v >= 999) {
      this.share.globalData.globalMutile = 999;
    } else {
      this.share.globalData.globalMutile = v;
    }
    e.target.value = this.share.globalData.globalMutile;
  }

  bet_max_prize_groupPercent: any;
  bet_min_prize_groupPercent: any;

  setPriceChooseOptions() {
    this.bet_max_prize_groupPercent = this.filterIndex(+(((+this.gameconfig.defaultData.data.user_prize_group - this.gameconfig.defaultData.data.bet_max_prize_group) / this.gameconfig.defaultData.data.series_amount).toFixed(3)) * 100);
    this.bet_min_prize_groupPercent = this.filterIndex(+(((+this.gameconfig.defaultData.data.user_prize_group - this.gameconfig.defaultData.data.bet_min_prize_group) / this.gameconfig.defaultData.data.series_amount).toFixed(3)) * 100);
  }

  filterIndex(num) {
    var r = /\.0{7}/;
    var a = String(num);
    if (r.test(a)) {
      return num.toFixed(0);
    }

    return num;
  }

  goHelpPage() {
    this.navCtrl.push("PlayHelpPage");
  }

  percent = 0;

  setPrizeGroup(prize, percent) {
    this.percent = percent;
    this.basket.setcustomprizeGroupchoose = this.basket.customprizeGroupchoose = prize;
  }

  //奖金组-选择的奖金组，再除以2000
}

function debounce(func, wait?, immediate?) {
  var timeout, args, context, timestamp, result;

  var later = function () {
    var last = new Date().getTime() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
