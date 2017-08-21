import {Component} from '@angular/core';
import {
  IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {Config} from "../../../config/config";
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {
  bankcardIconMap = Config.bankcardIconMap;
  loading: any;
  recharge:any;

  constructor(private share: GlobalShareProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public money: MoneySericeProvider) {
    this.checkBind();
    this.money.checkPayType();
  }

  checkBind() {
    if (!this.share.user.is_set_fund_password) this.pushPage('BindBankPage');
    if (this.share.user.is_set_fund_password != 1) this.pushPage('BindBankPage');
  }

  checkButton(text) {
    if(!this.money.payType) return false;
    for(let k in this.money.payType){
      if(k==text && this.money.payType[k]==1) return true;
    }
    return false;
  }


  checkInput(data, min, max) {
    if (!data.amount) {
      this.showToast('请输入金额');
    } else if (+data.amount < min) {
      this.showToast('最低充值' + min);
    } else if (+data.amount > max) {
      this.showToast('最高充值' + max);
    }
    return data.amount && (+data.amount >= min) && (+data.amount <= max);
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }


  hideLoading() {
    if (this.loading) this.loading.dismiss();
  }

  showLoading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({spinner: 'bubbles'});
      this.loading.present();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({'foo': 'bar'});
  }

  pushPage(page) {
    if (page) this.navCtrl.push(page);
  }
}
