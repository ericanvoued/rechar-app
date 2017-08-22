import {Injectable} from '@angular/core';
import {observe} from "../../tools/observe";
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";

let _ = new observe();

interface widthDrawRequestParamater {
  id: any,
  account: any,
  fund_password: string,
  amount: any,
  _token: string
}


@Injectable()
export class BankcardService {


  constructor(public httpclient: HttpClientProvider, private share: GlobalShareProvider) {

    _.observe(this.bindBankCardRequestType, () => {
      this.bindBankCardPostInitRemoteServer();
    });
    this.initSetting();
  }

  isBindBankCard = false;
  drawMoneyCount = 2.0;
  withdrawData = {data: {accounts: {available: 0, withdrawable: 0}, bank_cards: []}};
  fund_password: string;
  defautbankcard = {
    "id": "",
    "account": "",
    "account_name": "",
    "bank": "",
    "province": "",
    "city": ""
  }

  initSetting() {

  }

  /**
   * 提款页面接口
   */
  async getRemoteServer() {
    let data = await this.httpclient.get('/mobileh5-withdrawals/withdraw');
    try {
      this.withdrawData = data;
      this.defautbankcard = data.data.bank_cards[0];
      this.isBindBankCard = true;
    } catch (e) {
      this.isBindBankCard = false;
    }
  }


  parameters: widthDrawRequestParamater = {id: '', account: '', fund_password: '', amount: '', _token: ''};

  getParameters(): widthDrawRequestParamater {

    this.parameters._token = this.share.user.token;
    this.parameters.amount = this.drawMoneyCount;
    this.parameters.account = this.defautbankcard.account;
    this.parameters.fund_password = this.fund_password;
    this.parameters.id = this.defautbankcard.id;
    return this.parameters;
  }

  /**
   * 提款数据提交接口
   */
  autoManufacturers: any;

  postRemoteServer() {
    return this.httpclient.post('/mobileh5-withdrawals/withdraw/1', this.getParameters());
  }

  bindBankCardRequestType = {id: 0};

  bindBankCardPostParameter = {
    _token: '',
    bank_id: '',
    province_id: '',
    city_id: '',
    branch: '',
    account_confirmation: '',
    account: '',
    account_name: ''
  }

  getbindBankCardPostParameter() {
    this.bindBankCardPostParameter._token = this.share.user.token;
    return this.bindBankCardPostParameter;

  }

  bindBankCardPostInitRemoteServer() {
    return this.httpclient.post('/mobileh5-bank-cards/0/bind-card', this.getParameters());
  }

  /**
   * 绑卡提交接口
   * @return {Observable<R>}
   */

  async bindBankCardPostRemoteServer() {
    let result = await this.bindBankCardPostRemoteServerAsync();
    result.isSuccess && this.getRemoteServer();
  }
  bindBankCardPostRemoteServerAsync():Promise<any>{
    return this.httpclient.post(`/mobileh5-bank-cards/2/bind-card`, this.getbindBankCardPostParameter());
  }
  ValidedBankCardPParameters = {
    _token: '',
    id: '',
    fund_password: '',
    account: '',
    account_name: ''
  }

  /**
   * 银行卡验证接口,如果用户没有绑定银行卡.就会直接到/mobileh5-bank-cards/1/bind-card,获取银行列表和城市列表
   * @return {{_token: string, id: string, fund_password: string, account: string, account_name: string}}
   */
  getValidedBankCardPParameters() {
    this.ValidedBankCardPParameters._token = this.share.user.token;
    return this.ValidedBankCardPParameters;
  }

  validedBankCardPostRemoteServer() :Promise<any>{
    return this.httpclient.post('/mobileh5-bank-cards/0/bind-card', this.getValidedBankCardPParameters());
  }

  RemovedBankCardPParameters = {
    _token: '',
    account_name: '',
    account: '',
    fund_password: '',
    id: ''
  }

  getRemovedBankCardPParameters() {
    this.ValidedBankCardPParameters._token = this.share.user.token;
    return this.ValidedBankCardPParameters;
  }


  /**
   * 删除银行卡接口
   * @return {Observable<R>}
   */


  async removeBankCardPostRemoteServer():Promise<any> {
    let result = await this.httpclient.post('/mobileh5-bank-cards/destroy', this.getRemovedBankCardPParameters());
      result.isSuccess && this.getRemoteServer();
  }


  /**
   * 绑卡页面,用于获取城市列表,银行名称列表
   *
   */
  getBankCardInformationPostRemoteServer():Promise<any> {
    return this.httpclient.post('/mobileh5-bank-cards/1/bind-card', {_token: this.share.user.token});
  }

  drawAll() {
    this.drawMoneyCount = this.withdrawData.data.accounts.withdrawable;
  }

}
