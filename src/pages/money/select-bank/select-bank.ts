import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Config} from "../../../config/config";
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";

@IonicPage()
@Component({
  selector: 'page-select-bank',
  templateUrl: 'select-bank.html',
})
export class SelectBankPage {
  bankcardIconMap = Config.bankcardIconMap;
  bankCardList = [];
  constructor(public money: MoneySericeProvider, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.bankCardList = this.navParams.get('data');
    this.money.payClass = this.navParams.get('pay');
  }

  goBack(item) {
    this.money.bankItem = item;
    if(this.money.payClass.display!='yinlian') {
      if(this.money.payClass.display=='bank') this.money.payClass.max = Number(item.max);
      this.money.payClass.post.bank=item.id;
    }
    this.navCtrl.push('RechargePage',{item:item});
  }
}
