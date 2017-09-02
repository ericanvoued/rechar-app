import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Config} from "../../../config/config";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";

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

  constructor(public share:GlobalShareProvider,public navCtrl: NavController, public params: NavParams, public bankcardService: BankcardService) {
    this.bankcard = this.params.get('bankcard');
  }

  showConfirm() {
    this.share.showAlert(
      '确定解除该绑定的银行卡？',
      [{text: '取消', handler: () => {}},
        {text: '是的', handler: () => this.removeBankcard()}]
    );
  }

  removeBankcard() {
    this.bankcardService.RemovedBankCardPParameters.account_name = this.bankcard.account_name;
    this.bankcardService.RemovedBankCardPParameters.id = this.bankcard.id;
    this.bankcardService.RemovedBankCardPParameters.account = this.bankcard.account;
    setTimeout(() => this.removeBankcardAction(), 500);
  }

  removeBankcardAction() {
    this.share.showAlert(
      '资金密码',
      [{text: '取消', handler: data => {}},
        {text: '保存', handler: data => {
            if (!data.password) {
              this.share.showToast('请输入资金密码');
            } else {
              this.bankcardService.RemovedBankCardPParameters.fund_password = data.password;
              this.aaa(prompt);
            }
            return false;
          }
        }],
      '',
      '',
      [{type: 'password',
          name: 'password',
          placeholder: '输入资金密码'}]
    );
  }

  async aaa(prompt) {
    let data = await this.bankcardService.removeBankCardPostRemoteServer();
    if (data.isSuccess) {
      this.share.showToast('银行上解绑成功');
      prompt.dismiss();
      setTimeout(() => this.navCtrl.pop(), 1000);
    } else {
      this.share.showToast(data.Msg);
    }
  }
}
