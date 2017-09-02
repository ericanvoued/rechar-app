import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-card-comfirm',
  templateUrl: 'card-comfirm.html',
})
export class CardComfirmPage {
  comfirm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.comfirm = this.navParams.get('data').data;
  }
}
