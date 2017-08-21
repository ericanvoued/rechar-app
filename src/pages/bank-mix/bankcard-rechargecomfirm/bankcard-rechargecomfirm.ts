import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BankcardRechargecomfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bankcard-rechargecomfirm',
  templateUrl: 'bankcard-rechargecomfirm.html',
})
export class BankcardRechargecomfirmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankcardRechargecomfirmPage');
  }

}
