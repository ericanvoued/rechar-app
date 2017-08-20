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
  dataGroup: any;
  dataItems = [];
  banners: any;
  balance: any;
  notice = {data: []};
  message = {data: []};
  messageDetail: any;

  constructor(public client: HttpClientProvider, public share: GlobalShareProvider) {
  }

  async getUserBalance(): Promise<any> {
    let balance = await this.client.get('/mobileh5-users/user-account-info');
    this.balance = balance.data;
  }


  async getRemoteServer(): Promise<any> {
    let notice = await this.client.get('/mobileh5-announcements/');
    this.notice.data = notice.data.cmsarticle;
  }

  async getBannerRemoteServer(): Promise<any> {
    let banners = await this.client.get('/mobileh5-announcements/banner');
    this.banners = banners.data;
  }

  async postMessageServer(): Promise<any> {
    let message = await this.client.post('/mobileh5-station-letters/', this.getParameters(0));
    this.message.data = message.data.data;
  }

  async getMessageServer(id): Promise<any> {
    let messageDetail = await this.client.get(`/mobileh5-station-letters/${id}/view`);
    this.messageDetail = messageDetail.data;
  }

  async postLotteryServer() {
    this.share.presentLoadingDefault();
    let inData = await this.client.post('/mobile-lotteries-h5/lottery-info', this.getParameters(0));
    this.setInData(inData);
    this.dataGroup = dataGroup;
    this.share.dataGroup = dataGroup;
    this.share.dataItems = this.dataItems;
  }

  setInData(inData) {
    for (let k in inData) {
      if (inData[k].name && inData[k].nav) {
        this.dataItems.push(inData[k]);
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

  getParameters(index) {
    this.share.parameters[index]._token = localStorage.token;
    return this.share.parameters[index];
  }
}
