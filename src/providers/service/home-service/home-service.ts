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
  notice = {data: []};
  message = {data: []};
  messageDetail: any;
  betDetail:any;
  specialData:any;
  parameter:any;

  constructor(public client: HttpClientProvider, public share: GlobalShareProvider) {
  }

  async postRecordServer(): Promise<any> {
    this.parameter= await this.getParameters(1);
    let chargeRecord = await this.client.post('/mobileh5-reports/0/getmobileusertransaction/', this.parameter);
    this.share.chargeRecord.data = chargeRecord.data.data;
  }

  async postRemoteServer(): Promise<any> {
    this.parameter= await this.getParameters(0);
    let gameRecord = await this.client.post('/mobileh5-projects', this.parameter);
    this.share.gameRecord.data = gameRecord.data.data;
  }

  async getBetDetailServer(id): Promise<any> {
    let betDetail = await this.client.get(`/mobileh5-projects/${id}/view`);
    this.betDetail = betDetail.data;
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
    this.parameter= await this.getParameters(0);
    let message = await this.client.post('/mobileh5-station-letters/', this.parameter);
    this.message.data = message.data.data;
  }

  async getMessageServer(id): Promise<any> {
    let messageDetail = await this.client.get(`/mobileh5-station-letters/${id}/view`);
    this.messageDetail = messageDetail.data;
  }

  async postLotteryServer() {
    this.parameter= await this.getParameters(0);
    let inData = await this.client.post('/mobile-lotteries-h5/lottery-info', this.parameter);
    this.setInData(inData);
    this.dataGroup = dataGroup;
    this.share.dataGroup = dataGroup;
    this.share.dataItems = this.dataItems;
  }

  async getSpecialSever(): Promise<any> {
    let specialData = await this.client.get(`/mobileh5-announcements/youhui`);
    this.specialData = specialData.data.youhui;
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

  async getParameters(index) {
    if(!this.share.user) {
      let data = await this.client.post('/mobile-h5-auth/login', this.share.store.get("app_user"));
      if (data.isSuccess) this.share.user = data.data;
    }
    if(this.share.user) this.share.parameters[index]._token = this.share.user.token;
    return this.share.parameters[index];
  }
}
