import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';

/**
 * Generated class for the LhcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lhc',
  templateUrl: 'lhc.html',
})
export class LhcPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LhcPage');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '投注成功',
      subTitle: '您可以通过"游戏记录"查询您的投注记录！<a class="view-myHistory" href="http://www.baidu.com">查看投注记录</a>',

    });
    alert.present();
  }





}
