import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalShareProvider} from "../../../providers/global-share/global-share";

@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  constructor(public share: GlobalShareProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  quit() {
    this.share.showAlert('你确定退出帐号吗?',
      [{text: '取消', role: 'cancel', handler: () => console.log('Cancel clicked')},
        {
          text: '确定', handler: () => {
          this.share.user = null;
          this.share.balance = null;
          this.share.basketData = [];
          this.share.basketDataValideArr = [];
          this.share.gameRecord = {data: []};
          this.share.chargeRecord = {data: []};
          this.share.globalData = {globalMutile: 1, trace: 1};
          this.share.dataGroup = [];
          this.share.dataItems=null;
          this.navCtrl.setRoot('LoginPage');
        }
        }]);
  }
}
