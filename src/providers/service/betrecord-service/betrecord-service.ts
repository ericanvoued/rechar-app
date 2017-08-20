import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";

export interface betrecordParameter {
  _token: string,
  page: any,
  start: any,
  end: any,
  bet_status: any,
  lottery_id: any
}

@Injectable()
export class BetrecordServiceProvider {

  constructor(public share: GlobalShareProvider, public httpClient: HttpClientProvider) {
  }


  betRecordlist = {data: {data: []}};
  transactionRecordlist = {data: {data: []}};

  /**
   * 游戏记录
   */
  async postRemoteServer() {
    this.betRecordlist = await this.httpClient.post(`/mobileh5-projects`, this.getParameters());
  }

  /**
   * 帐变记录
   */
  async getRemoteServer() {
    this.transactionRecordlist = await this.httpClient.post(`/mobileh5-reports/0/getmobileusertransaction/`, this.getParameters());
  }

  getParameters(): betrecordParameter {
    this.parameters._token = this.share._token;
    return this.parameters;
  }

  parameters: betrecordParameter = {
    _token: '',
    page: 1,
    end: '',
    start: '',
    bet_status: 1,
    lottery_id: ''
  }

  parametersbianzhang: betrecordParameter = {
    _token: '',
    page: 1,
    end: '',
    start: '',
    bet_status: 1,
    lottery_id: ''
  }

}
