import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {GlobalShareProvider} from "../../../providers/global-share/global-share";

@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  constructor(private share: GlobalShareProvider, private alertCtrl: AlertController, public navCtrl: NavController) {
  }

  quit() {
    let alert = this.alertCtrl.create({
      title: '你确定退出帐号吗?',
      buttons: [{
        text: '取消',
        role: 'cancel',
        handler: () => console.log('Cancel clicked')
      }, {
        text: '确定',
        handler: () => this.clearrecord()
      }]
    });
    alert.present();
  }

  clearrecord() {
    this.share.user = null;
    this.share.balance=null;
    this.navCtrl.setRoot('LoginPage');
  }
}
