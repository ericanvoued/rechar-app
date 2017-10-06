import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClientProvider} from "../http-client/http-client";
import {GlobalShareProvider} from "./global-share";

@Injectable()
export class BalanceProvider {
  constructor(public client: HttpClientProvider,public share: GlobalShareProvider) {}

  async getBalance() {
    let balance = await this.client.get('/mobileh5-users/user-account-info');
    this.share.balance = balance.data;
  }
}
