import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";


let dataGroup = [
  {
    name: "时时彩系列",
    nav: "SSC|60",
    time: null,
    group: []
  }, {
    name: "11选5系列",
    nav: "11Y",
    time: null,
    group: []
  }, {
    name: "六合彩系列",
    nav: "LHC", time: null,
    group: []
  }, {
    name: "幸运28系列",
    nav: "KL",
    time: null,
    group: []
  }, {
    name: "快三系列",
    nav: "K3",
    time: null,
    group: []
  }
];
@Injectable()
export class HomeServiceProvider {
  parameters = {
    _token: '',
    page: 1,
    end: '',
    start: '',
    bet_status: 1,
    lottery_id: ''
  };
  dataGroup: any;
  banners: any;
  balance: any;
  notice = {data: []};

  constructor(public client: HttpClientProvider, public share: GlobalShareProvider) {}

  async getUserBalance(): Promise<any> {
    let balance = await this.client.get('/mobileh5-users/user-account-info');
    this.balance = balance.data;
  }

  async postRemoteServer(): Promise<any> {
    let notice = await this.client.post('/mobileh5-reports/0/getmobileusertransaction/', this.getParameters());
    this.notice.data = notice.data;
  }

  async getRemoteServer(): Promise<any> {
    let notice = await this.client.get('/mobileh5-announcements/');
    this.notice.data = notice.data.cmsarticle;
  }

  async getBannerRemoteServer(): Promise<any> {
    let banners = await this.client.get('/mobileh5-announcements/banner');
    this.banners = banners.data;
  }

  async postLotteryServer() {
    let inData = await this.client.post('/mobile-lotteries-h5/lottery-info', this.getParameters());
    this.setInData(inData);
    this.dataGroup = dataGroup;
    this.share.dataGroup=dataGroup;
  }

  setInData(inData) {
    for (let k in inData) {
      if (inData[k].name && inData[k].nav) {
        for (let v in dataGroup) {
          if (this.inStr(dataGroup[v].nav, inData[k].nav)) {
            if (!dataGroup[v].time) dataGroup[v].time = inData[k].time;
            dataGroup[v].group.push(inData[k]);
            break;
          }
        }
      }
    }
    return inData;
  }

  inStr(strB, strA) {
    let subStr = strB.split("|");
    let indexNumber;
    for (let v in subStr) {
      indexNumber = strA.toUpperCase().indexOf(subStr[v].toUpperCase());
      if (indexNumber > -1) break;
    }
    return indexNumber > -1;
  }

  getParameters() {
    this.parameters._token = localStorage.token;
    return this.parameters;
  }
}
