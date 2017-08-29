import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController, ViewController} from 'ionic-angular';

import {Config} from "../../../config/config";
import * as $ from 'jquery';
import {observe} from "../../../providers/tools/observe";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";
import {SetfundpasswordService} from "../../../providers/service/fund-service/setfundpassword-service";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";

let _ = new observe();


@IonicPage()
@Component({
  selector: 'page-get-money',
  templateUrl: 'get-money.html',
})
export class GetMoneyPage {

  bankcardIconMap = Config.bankcardIconMap;


  constructor(private share:GlobalShareProvider,public viewCtrl: ViewController, public navCtrl: NavController, public bankcard: BankcardService, public alertCtrl: AlertController, public toastCtrl: ToastController, public setfundpasswordService: SetfundpasswordService) {
    this.initlize();
  }

  initlize(): boolean {
    if (!this.bankcard.isBindBankCard) {
      let toast = this.toastCtrl.create({
        message: '您未绑卡,请先绑卡',
        duration: 2000,
        position: 'middle'
      });
      toast.present();
      setTimeout(() => {
        this.navCtrl.push("AddBankPage");
      }, 1000);
      return false;
    }
    return true;
  }

  ionViewDidLoad() {
    _.observe(this.select, 'update', () => {
      this.changebankcard();
    });
  }

  dismiss() {
    let data = {'foo': 'bar'};
    this.viewCtrl.dismiss(data);
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  changebankcard() {
    this.setdefautbankcard(this.select.autoManufacturers);
    $('.body-bg').fadeOut(300);
    $('.alert-con').removeClass('alert-show');
  }

  select = {autoManufacturers: ''};

  setdefautbankcard(account) {
    this.bankcard.defautbankcard = this.bankcard.withdrawData.data.bank_cards.filter(v => v.account == account)[0];
  }

  drawChashNow() {
    if (!this.initlize()) {
      return;
    }
    if (+this.bankcard.drawMoneyCount <= 0 || isNaN(this.bankcard.drawMoneyCount)) {
      this.bankcard.drawMoneyCount = 2.0;
    }

    let prompt = this.alertCtrl.create({
      title: '请输入资金密码',
      inputs: [
        {
          name: 'password',
          placeholder: '',
          type: 'password',
          value: ''
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {

          }
        },
        {
          text: '确认',
          handler: (data) => {
            if (!!data.password) {
              this.bankcard.fund_password = data.password;
              this.aaa();
            }
            return !!data.password;
          }
        }
      ]
    });
    prompt.present();
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: msg,
      buttons: ['好的']
    });
    alert.present();
  }

  async aaa() {
    let data = await  this.bankcard.postRemoteServer();
    if (data.isSuccess) {
      this.showAlert('您的提款申请已经提交成功');
    } else {
      let toast = this.toastCtrl.create({
        message: data.Msg,
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    }

  }
}
