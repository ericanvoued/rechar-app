import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Config} from "../../../config/config";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";

/**
 * Generated class for the SelectBankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-bank',
  templateUrl: 'select-bank.html',
})
export class SelectBankPage {
  bankcardIconMap = Config.bankcardIconMap;

  constructor(public sharebankcarddetail: GlobalShareProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  bankcardlist = [];

  ionViewDidLoad() {
    this.bankcardlist = this.navParams.get('data');
  }

  goBack(item) {
    if (this.navParams.get('isbankcard'))
      this.sharebankcarddetail.bankcardDetail2 = item;
    else
      this.sharebankcarddetail.bankcardDetail = item;

    this.navCtrl.pop();
  }

}
