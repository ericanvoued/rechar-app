import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";

@Injectable()
export class BalanceProvider {
  balance: any;
  constructor(public client: HttpClientProvider, public share: GlobalShareProvider) {}

  async getUserBalance(): Promise<any> {
    let balance = await this.client.get('/mobileh5-users/user-account-info');
    this.balance = balance.data;
    this.share.balance=this.balance;
  }
}
