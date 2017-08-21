import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {ReqTemplate} from "../../providers/tool/reqTemplate";
import {FundpasswordParameter} from "../../interfaces/parametersInterface/funds/FundpasswordParameter";
import {User} from "../initialize-service/user-serivce";
import {requestSerivce} from "../../interfaces/requestSerivce";
import {AlertController, ToastController} from "ionic-angular";

@Injectable()
export class SetfundpasswordService extends ReqTemplate implements requestSerivce {

  getRemoteServer(): any {
    return null;
  }

  constructor(public http: Http, public usr: User, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    super(http);
    this.initialize();
  }

  initialize(): boolean {
    if (this.isNoSetFundPW()) {
      this.showPrompt();
    }
    return this.isNoSetFundPW();
  }

  isNoSetFundPW(): boolean {
    return !(+this.usr.tmpUserInfo.data.is_set_fund_password);
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

  postRemoteServer() {
    return this.post('/mobileh5-users/safe-reset-fund-password', this.getParameters());

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
              this.postRemoteServer().subscribe((data) => {
                if (data.isSuccess) {
                  this.presentToast('资金密码设置成功');
                  this.usr.setfund_passwordAvailable();
                  prompt.dismiss();
                } else {
                  this.presentToast(data.Msg);
                }
              }, (c) => {
                this.presentToast('发生未知错误,请退出应用后,重试一次');
              });
            }
            return false;
          }
        }
      ]
    });
    prompt.present();
  }
}
