import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";

@IonicPage()
@Component({
  selector: 'page-get-money',
  templateUrl: 'get-money.html',
})
export class GetMoneyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public money:MoneySericeProvider) {
  }

  ionViewDidLoad() {

  }

}
