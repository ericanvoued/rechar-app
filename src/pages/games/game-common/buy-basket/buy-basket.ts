import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GameconfigServiceProvider} from "../../../../providers/service/games/gameconfig-service/gameconfig-service";
import {BasketServiceProvider} from "../../../../providers/service/games/basket-service/basket-service";
import {GlobalShareProvider} from "../../../../providers/global-share/global-share";
import {BalanceProvider} from "../../../../providers/global-share/balance";
import {Effect} from "../../../effect";

@IonicPage()
@Component({
  selector: 'page-buy-basket',
  templateUrl: 'buy-basket.html',
})
export class BuyBasketPage extends Effect {
  constructor(public balance:BalanceProvider, public navParams: NavParams,private share: GlobalShareProvider, public navCtrl: NavController, public basket: BasketServiceProvider, public gameconfig: GameconfigServiceProvider) {
    super();
  }

  ionViewDidLoad() {
    this.share.ispk10 = this.navParams.get('ispk10');
    this.initEffect();
    this.balance.getBalance();
    this.basket.setcustomprizeGroupchoose = this.basket.customprizeGroupchoose = this.share.defaultData.data.bet_max_prize_group;
    this.setPriceChooseOptions();
  }




  writeInput=this.debounce((name,e)=>this.changeInput(name,e), 1000);

  changeInput(name,e){
    let num= +e.target.value;
    num=num<1?1:(num>999?999:num);
    e.target.value=num;
    if(name=='trace')
      this.share.globalData.trace=num;
    else if(name=='mutiple')
      this.share.globalData.globalMutile=num;
  }

  numChange(name,type){
    let num=this.share.globalData.trace;
    if(name=='mutiple') num=this.share.globalData.globalMutile;
    if(type=='+'){
      if(num<999) num++;
    }else if(type=='-'){
      if(num>1) num--;
    }
    if(name=='trace')
      this.share.globalData.trace=num;
    else if(name=='mutiple')
      this.share.globalData.globalMutile=num;
  }




  async submit() {
    if (this.share.balance.available < this.basket.totalAllCount) {
      this.share.showAlert('', ['好'], '您的余额不足,请先充值');
    } else {
      this.basket.submit(this);
    }
  }

  bet_max_prize_groupPercent: any;
  bet_min_prize_groupPercent: any;

  setPriceChooseOptions() {
    this.bet_max_prize_groupPercent = parseFloat((100*(+this.share.defaultData.data.user_prize_group - this.share.defaultData.data.bet_max_prize_group) / this.share.defaultData.data.series_amount).toFixed(4));
    this.bet_min_prize_groupPercent = parseFloat((100*(+this.share.defaultData.data.user_prize_group - this.share.defaultData.data.bet_min_prize_group) / this.share.defaultData.data.series_amount).toFixed(4));
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

