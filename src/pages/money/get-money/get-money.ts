import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController} from 'ionic-angular';
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
  loading: any;

  constructor(public share:GlobalShareProvider,public viewCtrl: ViewController, public navCtrl: NavController, public bankcard: BankcardService,public setfundpasswordService: SetfundpasswordService) {
    this.initlize();
  }

  initlize(): boolean {
    if (!this.bankcard.isBindBankCard) {
      this.share.showToast('您未绑卡,请先绑卡');
      setTimeout(() => this.navCtrl.push("AddBankPage"), 1000);
      return false;
    }
    return true;
  }

  ionViewDidLoad() {
    _.observe(this.select, 'update', () => {
      this.changebankcard();
    });
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
    this.share.showAlert('请输入资金密码',
      [{text: '取消', handler: data => {}},
        {text: '确认',
          handler: (data) => {
            if (!!data.password) {
              this.bankcard.fund_password = data.password;
              this.aaa();
            }
            return !!data.password;
          }
        }],
      '','',
      [{name: 'password',
          placeholder: '',
          type: 'password',
          value: ''}]
      );
  }

  async aaa() {
    let data = await  this.bankcard.postRemoteServer();
    if (data.isSuccess) {
      this.share.showAlert('您的提款申请已经提交成功',['好的']);
    } else {
      this.share.showToast(data.Msg,3000);
    }
  }






  checkBind() {
    if (!this.share.user.is_set_fund_password || this.share.user.is_set_fund_password != 1){
      this.share.showToast('您未绑卡,请先绑卡');
      setTimeout(() => this.pushPage('BindBankPage'), 1000);
    }
  }








  dismiss() {
    this.viewCtrl.dismiss({'foo': 'bar'});
  }

  pushPage(page) {
    if (page) this.navCtrl.push(page);
  }
}
