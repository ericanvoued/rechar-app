import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";

@IonicPage()
@Component({
  selector: 'page-manage-catalogue',
  templateUrl: 'manage-catalogue.html',
})
export class ManageCataloguePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public money: MoneySericeProvider) {
  }

  pushPage(page) {
    if (page) this.navCtrl.push(page);
  }
}
