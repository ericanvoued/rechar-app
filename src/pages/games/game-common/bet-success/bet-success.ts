import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalShareProvider} from "../../../../providers/global-share/global-share";

/**
 * Generated class for the BetSuccessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bet-success',
  templateUrl: 'bet-success.html',
})
export class BetSuccessPage {

  constructor(public share: GlobalShareProvider, public navCtrl: NavController, public  navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  gosscpage() {
    this.navCtrl.pop();
    this.navCtrl.pop();
  }

  go(a, b) {
    this.navCtrl.push(a, b);
  }

}
