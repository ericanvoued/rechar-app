import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../http-client/http-client";
import {GlobalShareProvider} from "../global-share/global-share";

@Injectable()
export class UserbalanceServiceProvider {
  public balance = {available: 0};

  constructor(public httpclient: HttpClientProvider, public share: GlobalShareProvider) {

  }

  async getBalaceAgain() {
    let data = await this.httpclient.get('/mobileh5-users/user-account-info');
    this.share.balance = this.balance = data.data;
  }
}
