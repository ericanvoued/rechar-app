import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";

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
  parameters = {id: '', account: '', account_name: '', fund_password: '', amount: 2, _token: ''};
  withdraw = {data: {accounts: {available: 0, withdrawable: 0}, bank_cards: []}};
  selectCard = {"id": "", "account": "", "account_name": "", "bank": "", "province": "", "city": ""};
  getTimes = 0;
  aliCode: any;
  weCode: any;
  bankCode: any;
  unionCode: any;
  baiduCode: any;
  QQCode: any;

  constructor(private client: HttpClientProvider, private share: GlobalShareProvider) {}

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

  async getWithdraw() {
    let data = await this.client.get('/mobileh5-withdrawals/withdraw');
    this.getTimes = 1;
    try {
      this.withdraw = data;
      this.selectCard = data.data.bank_cards[0];
      this.share.user.is_set_fund_password = 1;
    } catch (e) {
      this.share.user.is_set_fund_password = '';
    }
  }

  async postWithdraw() {
    let data = await  this.client.post('/mobileh5-withdrawals/withdraw/1', this.getParameters());
    if (data.isSuccess) {
      this.share.showAlert('您的提款申请已经提交成功', ['好的']);
    } else {
      this.share.showToast(data.Msg, 3000);
    }
  }

  getParameters() {
    this.parameters._token = this.share.user.token;
    this.parameters.account = this.selectCard.account;
    this.parameters.account_name = this.selectCard.account_name;
    this.parameters.id = this.selectCard.id;
    return this.parameters;
  }

  getAll() {
    this.parameters.amount = this.withdraw.data.accounts.withdrawable;
  }
}
