import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";

@Injectable()
export class ModifyPasswordService {

  constructor(private httpClient: HttpClientProvider, private share: GlobalShareProvider) {

  }


  postRemoteServer(): Promise<any> {
    let pa = Object.assign({}, this.getParameters());
    this.clear(this.parameters);
    return this.httpClient.post('/mobileh5-users/password-management/0', pa);
  }

  clear(obj) {
    for (let key in obj) {
      obj[key] = '';
    }
  }

  changeFunPWpostRemoteServer(): Promise<any> {
    let pa = Object.assign({}, this.getParameters());
    this.clear(this.parameters);

    return this.httpClient.post('/mobileh5-users/password-management/1', pa);

  }

  getRemoteServer(): any {

    return null;
  }

  getParameters(): any {
    this.parameters._token = this.share.user.token;
    return this.parameters;
  }

  getFundParameters(): any {
    this.fundparameters._token = this.share.user.token;
    return this.fundparameters;
  }

  parameters = {
    _token: '',
    old_password: '',
    password: '',
    password_confirmation: ''
  };
  fundparameters = {
    _token: '',
    old_fund_password: '',
    fund_password: '',
    fund_password_confirmation: ''
  };
}
