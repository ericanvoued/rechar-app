import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../../../http-client/http-client";
import {GlobalShareProvider} from "../../../global-share/global-share";

@Injectable()
export class TopupServiceProvider {

  constructor(private httpClient: HttpClientProvider, private share: GlobalShareProvider) {

  }

  getbanks_tabs() {
    let param = {_token: this.share.user.token};
    return this.httpClient.post('/mobile-lotteries-h5/load-data/banks_tab/availabe', param);
  }

  postRemoteServer(): any {
    return null;
  }

  getRemoteServer(): any {
    return null;
  }

  getParameters(): any {
    return null;
  }


  parameters: any;
  /**
   * 微信
   * @type {{_token: string; bank_code: string; deposit_mode: number; bank: number; amount: string}}
   */
  postWeixinRechargeParameter = {
    _token: '',
    bank_code: 'WEIXIN',
    deposit_mode: 2,
    bank: 48,
    amount: ''
  }
  /**
   * 支付宝
   * @type {{_token: string; deposit_mode: number; bank: number; amount: string}}
   */
  postAlipayRechargeParameter = {
    _token: '',
    deposit_mode: 2,
    bank: 43,
    amount: ''
  }

  /**
   * 百度充值
   * @return {{_token: string, bank_code: string, deposit_mode: number, bank: number, amount: string}}
   */
  postBaiduRechargeParameter = {
    _token: '',
    deposit_mode: 2,
    bank_code: 'BAIDU',
    bank: 50,
    amount: 10
  }


  getpostBaiduRechargeParameter() {
    this.postBaiduRechargeParameter._token = this.share.user.token;
    return this.postBaiduRechargeParameter;
  }

  postBaiduRechargeRemoteServer(): Promise<any> {
    return this.httpClient.post('/mobileh5-recharges/confirmMobileBaidu', this.getpostBaiduRechargeParameter());
  }

  /**
   * QQ钱包充值
   * @return {{_token: string, bank_code: string, deposit_mode: number, bank: number, amount: string}}
   */
  postQQRechargeParameter = {
    _token: '',
    deposit_mode: 2,
    bank_code: 'QQ',
    bank: 49,
    amount: 10
  }


  getpostQQRechargeParameter() {
    this.postQQRechargeParameter._token = this.share.user.token;
    return this.postQQRechargeParameter;
  }

  postQQRechargeRemoteServer(): Promise<any> {
    return this.httpClient.post('/mobileh5-recharges/confirmMobileQq', this.getpostQQRechargeParameter());
  }

  /**
   * 微信充值
   * @return {{_token: string, bank_code: string, deposit_mode: number, bank: number, amount: string}}
   */
  getpostWeixinRechargeParameter() {
    this.postWeixinRechargeParameter._token = this.share.user.token;
    return this.postWeixinRechargeParameter;
  }

  postWeixinRechargeRemoteServer() {
    return this.httpClient.post('/mobileh5-recharges/confirmWeiXin', this.getpostWeixinRechargeParameter());
  }

  /**
   * 支付宝充值
   * @return {{_token: string, bank_code: string, deposit_mode: number, bank: number, amount: string}}
   */
  getpostAlipayRechargeParameter() {
    this.postAlipayRechargeParameter._token = this.share.user.token;
    return this.postAlipayRechargeParameter;
  }

  postAlipayRechargeRemoteServer(): Promise<any> {
    return this.httpClient.post('/mobileh5-recharges/get-alipay-qrcode', this.getpostAlipayRechargeParameter());
  }

  /**
   * 1.获取快捷或银行充值接口页面
   */
  getQuiklyAndBankRechargePage() {
    return this.httpClient.get('/mobileh5-recharges/netbank');
  }

  /**
   * 2.提交快捷或银行充值
   * @type {{_token: string; deposit_mode: number; bank: string; amount: string}}
   */
  postQuiklyAndBankRechargeParameter = {
    _token: '',
    deposit_mode: 2,
    bank: '',
    amount: ''
  }

  getpostQuiklyAndBankRechargeParameter(isBank) {
    this.postQuiklyAndBankRechargeParameter._token = this.share.user.token;
    if (isBank)
      this.postQuiklyAndBankRechargeParameter.deposit_mode = 1;
    else
      this.postQuiklyAndBankRechargeParameter.deposit_mode = 2;

    return this.postQuiklyAndBankRechargeParameter;
  }

  postQuiklyAndBankRecharge(isBank): Promise<any> {
    return this.httpClient.post('/mobileh5-recharges/confirm', this.getpostQuiklyAndBankRechargeParameter(isBank));
  }

  /**
   * 银联充值,获取页面
   * @return {Observable<any>}
   */
  getUnionPay() {
    return this.httpClient.get('/mobileh5-recharges/sdpay');
  }

  unionPayComfirmParameter = {
    _token: '',
    deposit_mode: 2,
    bank: 47,
    amount: ''
  }

  getUnionPayComfirmParameter() {
    this.unionPayComfirmParameter._token = this.share.user.token;
    return this.unionPayComfirmParameter;
  }

  /**
   * 银联充值提交
   * @return {Observable<any>}
   */
  unionPayComfirm(): Promise<any> {
    return this.httpClient.post('/mobileh5-recharges/confirmSdpay', this.getUnionPayComfirmParameter());
  }

}
