import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController} from 'ionic-angular';
import {Config} from "../../../config/config";
import * as $ from 'jquery';
import {observe} from "../../../providers/tools/observe";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";
import {SetfundpasswordService} from "../../../providers/service/fund-service/setfundpassword-service";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";

let _ = new observe();

@IonicPage()
@Component({
  selector: 'page-get-money',
  templateUrl: 'get-money.html',
})
export class GetMoneyPage {
  bankcardIconMap = Config.bankcardIconMap;
  select = {card: ''};

  constructor(public share:GlobalShareProvider,public money:MoneySericeProvider,public viewCtrl: ViewController, public navCtrl: NavController, public bankcard: BankcardService,public setfundpasswordService: SetfundpasswordService) {
    this.money.getTimes=0;
    this.checkBind();
  }

  ionViewDidLoad() {
    _.observe(this.select, 'update', () => this.changeCard());
  }

  changeCard() {
    this.money.selectCard = this.money.withdraw.data.bank_cards.filter(v => v.account == this.select.card)[0];
    $('.body-bg').fadeOut(300);
    $('.alert-con').removeClass('alert-show');
  }

  getMoneyToCard(){
    let max=500000;
    if(this.checkBind()) return;
    if(isNaN(this.money.parameters.amount) || this.money.parameters.amount<2) this.money.parameters.amount=2;
    if(this.money.withdraw.data.accounts.withdrawable<max) max=this.money.withdraw.data.accounts.withdrawable;
    if(this.money.parameters.amount>max) this.money.parameters.amount=max;
    this.share.showAlert('请输入资金密码',
      [{text: '取消', handler: data => {}},
        {text: '确认',
          handler: (data) => {
            if (!!data.password) {
              this.money.parameters.fund_password = data.password;
              this.money.postWithdraw();
            }
            return !!data.password;
          }
        }],
      '','',
      [{name: 'password',
        placeholder: '',
        type: 'password',
        value: ''}]);
  }

  async checkBind() {
    if(this.money.getTimes==0) await this.money.getWithdraw();
    if (!this.share.user.is_set_fund_password || this.share.user.is_set_fund_password != 1){
      this.share.showToast('您未绑卡,请先绑卡');
      setTimeout(() => this.pushPage('BindBankPage'), 1000);
      return true;
    }
    return false;
  }

  dismiss() {
    this.viewCtrl.dismiss({'foo': 'bar'});
  }

  pushPage(page) {
    if (page) this.navCtrl.push(page);
  }
}
