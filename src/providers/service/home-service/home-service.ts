import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";

@Injectable()
export class HomeServiceProvider {
  parameters: {
    _token: '',
    page: 1,
    end: '',
    start: '',
    bet_status: 1,
    lottery_id: ''
  };

  constructor(private client: HttpClientProvider, private share: GlobalShareProvider) {

  }

  getUserBalance(): Promise<any> {
    return this.client.get('/mobileh5-users/user-account-info');
  }

  postRemoteServer(): Promise<any> {
    return this.client.post('/mobileh5-reports/0/getmobileusertransaction/', this.getParameters());
  }

  getRemoteServer(): Promise<any> {
    return this.client.get('/mobileh5-announcements/');
  }

  getBannerRemoteServer(): Promise<any> {
    return this.client.get('/mobileh5-announcements/banner');
  }

  postLotteryServer() {
    let inData = this.client.post('/mobile-lotteries-h5/lottery-info', this.getParameters());
    let dataGroup = [{name: "时时彩系列", nav: "SSC|60", time: null, group: []}, {
      name: "11选5系列",
      nav: "11Y",
      time: null,
      group: []
    }, {name: "六合彩系列", nav: "LHC", time: null, group: []}, {
      name: "幸运28系列",
      nav: "KL",
      time: null,
      group: []
    }, {name: "快三系列", nav: "K3", time: null, group: []}];

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
    return dataGroup;
  }

  inStr(strB, strA) {
    let subStr = strB.split("|");
    let indexNumber = -1;
    for (let v in subStr) {
      indexNumber = strA.toUpperCase().indexOf(subStr[v].toUpperCase());
      if (indexNumber > -1) break;
    }
    return indexNumber > -1;
  }

  getParameters() {
    this.parameters._token = this.share._token;
    return this.parameters;
  }

}
