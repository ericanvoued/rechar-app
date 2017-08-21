import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";
import {observe} from "../../../providers/tools/observe";

let _ = new observe();

/**
 * Generated class for the BindBankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bind-bank',
  templateUrl: 'bind-bank.html',
})
export class BindBankPage {

  userInput = {
    account_name: "",
    account: "",
    branch: ""
  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public bankcardService: BankcardService, public toastCtrl: ToastController) {

  }

  province = {title: ''}
  provinceList = [];

  city = {title: ''}
  cityList = [];

  district = {title: ''}


  convertBanksToArray(data): Array<any> {
    let arr = [];
    for (let key in data) {
      let obj = {id: key, name: data[key]};
      arr.push(obj);
    }
    return arr;
  }

  bank = {title: ''}
  banks = [];

  initilizeCityAndProvince(data) {

    if (data.isSuccess) {
      this.provinceList = data.data.provice_cities;
      this.banks = this.convertBanksToArray(data.data.banks[0]);
    } else {
      this.showtoast(data.Msg);
    }

  }

  showtoast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async aaa() {
    let data = await this.bankcardService.getBankCardInformationPostRemoteServer();
    this.initilizeCityAndProvince(data);
  }

  async bbb() {
    let data = await this.bankcardService.validedBankCardPostRemoteServer();
    this.initilizeCityAndProvince(data);

  }

  ionViewDidLoad() {
    if (this.bankcardService.isBindBankCard) {
      this.aaa();
    } else {
      this.bbb();
    }

    _.observe(this.province, () => {
      this.chooseProvince();
    });
    _.observe(this.city, () => {
      this.chooseCity();
    });

    _.observe(this.district, () => {
    });
  }

  chooseCity() {
    this.cityList.some((v) => {
      if (v.id == this.city.title) {
        this.district = v.children;
      }
      return v.id == this.city.title;
    });
  }

  chooseProvince() {
    this.provinceList.some((v) => {
      if (v.id == this.province.title) {
        this.cityList = v.children;
      }
      return v.id == this.province.title;
    });
  }


  get_id(data: Array<{ id: any, name: any }>, std: { title: any }): any {
    for (let val of data) {
      if (val.id == std.title) return val.id;
    }
  }


  async todoParameter() {
    let params = {
      bank_id: this.get_id(this.banks, this.bank),
      province_id: this.get_id(this.provinceList, this.province),
      city_id: this.get_id(this.cityList, this.city),
      branch: this.userInput.branch,
      account_confirmation: this.userInput.account,
      account: this.userInput.account,
      account_name: this.userInput.account_name
    }
    if (!this.isVaildedParameter(params)) return;

    let result = await this.bankcardService.bindBankCardPostRemoteServerAsync();

    if (result.isSuccess) {
      this.bankcardService.getRemoteServer();
      this.showMessage('绑卡成功');
    } else {
      this.showMessage(result.Msg);
    }
  }

  isVaildedParameter(params): boolean {
    for (let key in params) {
      this.bankcardService.bindBankCardPostParameter[key] = params[key];
      if (!params[key]) {
        let alert = this.alertCtrl.create({
          title: '请完善资料再提交',
          buttons: ['好的']
        });
        alert.present();
        return false;
      }
    }
    return true;
  }

  showMessage(msg) {
    let confirm = this.alertCtrl.create({
      title: '',
      message: msg,
      buttons: ['确定']
    });
    confirm.present();
  }

  showConfirm() {
    this.todoParameter();
  }

}
