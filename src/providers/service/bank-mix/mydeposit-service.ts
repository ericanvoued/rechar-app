import {Injectable} from '@angular/core';
import {GlobalShareProvider} from "../../global-share/global-share";
import {HttpClientProvider} from "../../http-client/http-client";

 interface mydepositParameter {
  page: any,
  _token: string
}

@Injectable()
export class MydepositService {

  recordType = {type: 0};
  private recordTypeArrayObserve = [];

  private _type = 0;
  set type(v) {

    if (this._type != v) {
      this.postRemoteServer();
    }
    this._type = v;
  }

  get type() {
    return this._type;
  }

  constructor(private share:GlobalShareProvider,private httpclient:HttpClientProvider) {
    this.recordTypeArrayObserve.push(this.recordType);
  }

  parameters: mydepositParameter = {
    page: 1,
    _token: ''
  }

  getParameters(): mydepositParameter {
    this.parameters._token = this.share.user.token;
    return this.parameters;
  }

  recordList = {data: []};

  async postRemoteServer() {
     let data = await this.httpclient.post(`/mobileh5-reports/${this.recordType.type}/mydeposit`, this.getParameters());
    this.recordList = data;
  }

  getRemoteServer(): any {
    return null;
  }

}
