import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";
import {ToastController} from "ionic-angular";

@Injectable()
export class MoneySericeProvider {
  loading: any;
  payType = [];
  bankCardList = [];
  bankItem: any;
  maxLoad: any;
  payClass = {
    display: '',
    max: 0,
    remind: false,
    button: '',
    show: {alipay: '', weixin: '', bankkj: '', bank: '', yinlian: '', baidu: '', qq: ''},
    post: {_token: '', deposit_mode: 2, bank_code: '', bank: 0, amount: 10}
  };
  aliCode:any;
  weCode:any;
  bankCode:any;
  unionCode:any;
  baiduCode:any;
  QQCode:any;

  constructor(private client: HttpClientProvider, private share: GlobalShareProvider, public toastCtrl: ToastController) {
  }

  async checkPayType(): Promise<any> {
    let payType = await this.client.post('/mobile-lotteries-h5/load-data/banks_tab/availabe', {_token: this.share.user.token});
    this.payType = payType.data;
  }

  async getBankList() {
    let bankCardList = await this.client.get('/mobileh5-recharges/netbank');
    this.bankCardList = bankCardList.data.banks;
    if (this.bankCardList.length) this.bankItem = this.bankCardList[0];
    if (this.payClass.display == 'bank') this.payClass.max = Number(this.bankItem.max);
  }

  async getUnion() {
    let bankCardList = await this.client.get('/mobileh5-recharges/sdpay');
    this.maxLoad = bankCardList.data.fMaxLoad;
    this.bankCardList = bankCardList.data.banks;
    if (this.bankCardList.length) this.bankItem = this.bankCardList[0];
  }

  async postAlipayCode() {
    let aliCode = await this.client.post('/mobileh5-recharges/get-alipay-qrcode', this.payClass.post);
    this.aliCode = aliCode;
  }

  async postWechartCode() {
    let weCode = await this.client.post('/mobileh5-recharges/confirmWeiXin', this.payClass.post);
    this.weCode = weCode;
  }

  async postBankCode() {
    let bankCode = await this.client.post('/mobileh5-recharges/confirm', this.payClass.post);
    this.bankCode = bankCode;
  }

  async postUnionCode() {
    let unionCode = await this.client.post('/mobileh5-recharges/confirmSdpay', this.payClass.post);
    this.unionCode = unionCode;
  }

  async postBaiduCode() {
    let baiduCode = await this.client.post('/mobileh5-recharges/confirmMobileBaidu', this.payClass.post);
    this.baiduCode = baiduCode;
  }

  async postQQCode() {
    let QQCode = await this.client.post('/mobileh5-recharges/confirmMobileQq', this.payClass.post);
    this.QQCode = QQCode;
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
}
