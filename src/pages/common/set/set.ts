import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {}

  quit() {
    let alert = this.alertCtrl.create({
      title: '你确定退出帐号吗?',
      buttons: [{
          text: '取消',
          role: 'cancel',
          handler: () => console.log('Cancel clicked')
        }, {
          text: '确定',
          handler:() => location.reload()
      }]
    })
    alert.present();
  }
}
