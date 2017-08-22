import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Config} from "../../../config/config";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";

/**
 * Generated class for the RemoveBindPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remove-bind',
  templateUrl: 'remove-bind.html',
})
export class RemoveBindPage {

  bankcard = {account_name: '', bank: '', account: '', id: ''}
  bankcardIconMap = Config.bankcardIconMap;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public params: NavParams, public bankcardService: BankcardService, public toastCtrl: ToastController) {
    this.bankcard = this.params.get('bankcard');
  }

  ionViewDidLoad() {
  }

  showConfirm() {

    let confirm = this.alertCtrl.create({
      title: '确定解除该绑定的银行卡？',
      message: '',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '是的',
          handler: () => {
            confirm.dismiss();
            this.removeBankcard();
          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

  removeBankcard() {
    this.bankcardService.RemovedBankCardPParameters.account_name = this.bankcard.account_name;
    this.bankcardService.RemovedBankCardPParameters.id = this.bankcard.id;
    this.bankcardService.RemovedBankCardPParameters.account = this.bankcard.account;

    setTimeout(() => {
      this.removeBankcardAction();
    }, 500);
  }

  removeBankcardAction() {
    let prompt = this.alertCtrl.create({
      title: '资金密码',
      message: "",
      inputs: [
        {
          type: 'password',
          name: 'password',
          placeholder: '输入资金密码'

        }
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '保存',
          handler: data => {
            if (!data.password) {
              this.presentToast('请输入资金密码');
            } else {
              this.bankcardService.RemovedBankCardPParameters.fund_password = data.password;
              this.aaa(prompt);
            }

            return false;
          }
        }
      ]
    });

    prompt.present();
  }

  async aaa(prompt) {
    let data = await this.bankcardService.removeBankCardPostRemoteServer();
    if (data.isSuccess) {
      this.presentToast('银行上解绑成功');
      prompt.dismiss();
      setTimeout(() => {
        this.navCtrl.pop();
      }, 1000);
    } else {
      this.presentToast(data.Msg);
    }
  }
}
