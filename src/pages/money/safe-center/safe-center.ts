import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ModifyPasswordService} from "../../../providers/service/fund-service/modify-password-service";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";

@IonicPage()
@Component({
  selector: 'page-safe-center',
  templateUrl: 'safe-center.html',
})
export class SafeCenterPage {

  constructor(public share:GlobalShareProvider,public navCtrl: NavController, public modifyPasswordService: ModifyPasswordService) {
  }

  ionViewDidLoad() {

  }

  status = {
    "1925": "已经设置资金密码",
    "1900": "登录超时",
    "1922": "原始密码错误",
    "1923": "设置密码失败",
    "1924": "设置密码成功",
    "1917": "原始资金密码错误",
    "1920": "修改资金密码失败",
    "1919": "修改资金密码成功",
    "1921": "资金密码和密码不能相同",
    "1918": "资金密码不能与密码一致"
  };

  showSuccessAlert() {
    this.share.showAlert(
      '<img src="assets/img/ok-icon.png" alt="">',
      [{text: '重新登陆', handler: () => this.navCtrl.parent.parent.setRoot("LoginPage")}],
      '密码修改成功');
  }

  showSuccessAlert2() {
    this.share.showAlert(
      '<img src="assets/img/ok-icon.png" alt="">',
      [{text: '确定', handler: () => this.navCtrl.pop()}],
      '密码修改成功');
  }

  validEmpty(param) {
    for (let key in param) {
      if (!param[key] && (key != '_token')) return true;
    }
    return false;
  }

  async modityLoginPassword() {
    if (this.validEmpty(this.modifyPasswordService.parameters)) {
      this.share.showAlert('资料不完整,请检查您的输入',['好的']);
      return;
    }
    if (this.modifyPasswordService.parameters.password != this.modifyPasswordService.parameters.password_confirmation) {
      this.share.showAlert('新密码和确认密码不一致,请重新输入',['好的']);
      return;
    }
    let data = await this.modifyPasswordService.postRemoteServer();
    if (data.isSuccess) {
      this.showSuccessAlert();
    } else {
      this.share.showAlert(this.status[data.errno],['好的']);
    }
  }

  async modityFundPassword() {
    if (this.validEmpty(this.modifyPasswordService.fundparameters)) {
      this.share.showAlert('资料不完整,请检查您的输入',['好的']);
      return;
    }
    if (this.modifyPasswordService.fundparameters.fund_password != this.modifyPasswordService.fundparameters.fund_password_confirmation) {
      this.share.showAlert('新密码和确认密码不一致,请重新输入',['好的']);
      return;
    }

    let data = await this.modifyPasswordService.changeFunPWpostRemoteServer();
    if (data.isSuccess) {
      this.showSuccessAlert2();
    } else {
      this.share.showAlert(this.status[data.errno],['好的']);
    }

  }
}
