import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";

@Injectable()
export class MoneySericeProvider {
  payType = [];


  constructor(private client: HttpClientProvider, private share: GlobalShareProvider) {
  }

  async checkPayType(): Promise<any> {
    let payType = await this.client.post('/mobile-lotteries-h5/load-data/banks_tab/availabe', {_token: this.share.user.token});
    this.payType = payType.data;
  }

  // async getQuiklyAndBankRechargePage() {
  //   await return this.client.get('/mobileh5-recharges/netbank');
  // }






}
