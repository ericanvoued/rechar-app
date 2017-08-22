import {Injectable} from '@angular/core';

import {AlertController, ToastController} from "ionic-angular";
import {GlobalShareProvider} from "../../global-share/global-share";
import {HttpClientProvider} from "../../http-client/http-client";

interface FundpasswordParameter {
  _token: string,
  fund_password: string,
  fund_password_confirmation: string
}


@Injectable()
export class SetfundpasswordService {

  getRemoteServer(): any {
    return null;
  }

  constructor(private http: HttpClientProvider, private share: GlobalShareProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.initialize();
  }

  initialize(): boolean {
    if (this.isNoSetFundPW()) {
      this.showPrompt();
    }
    return this.isNoSetFundPW();
  }

  isNoSetFundPW(): boolean {
    return !(+this.share.user.is_set_fund_password);
  }

  parameters: FundpasswordParameter = {
    _token: '',
    fund_password: '',
    fund_password_confirmation: ''
  }

  getParameters(): FundpasswordParameter {
    this.parameters._token = this.share.user.token;
    return this.parameters;
  }

  postRemoteServer(): Promise<any> {
    return this.http.post('/mobileh5-users/safe-reset-fund-password', this.getParameters());

  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '请设置资金密码',
      message: "",
      inputs: [
        {
          type: 'password',
          name: 'password',
          placeholder: '至少8位,字母和数字的组合'

        }, {
          type: 'password',
          name: 'repassword',
          placeholder: '重复输入资金密码'
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
            if (data.password != data.repassword) {
              this.presentToast('两次输入不一致,请重新输入');
            } else if (!data.password || !data.repassword) {
              this.presentToast('输入有误');
            } else {
              this.parameters.fund_password = data.password;
              this.parameters.fund_password_confirmation = data.repassword;
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
    let data = await this.postRemoteServer();

    if (data.isSuccess) {
      this.presentToast('资金密码设置成功');
      this.share.user.is_set_fund_password = 1;
      prompt.dismiss();
    } else {
      this.presentToast(data.Msg);
    }
  }

}
