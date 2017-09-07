import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClientProvider} from "../../../http-client/http-client";
import {BusinessTool} from "../../../tools/business-tool";
import {GlobalShareProvider} from "../../../global-share/global-share";

interface tokenOnly {
  _token: string
}

@Injectable()
export class GameconfigServiceProvider {
  pid: string;
  data: any = {};
  defaultsMethodData = {a: {}, b: {}, c: {selectarea: [], mutipleAndModeObj: {}}};
  defaultData: any = {data: {lottery_balls: ''}};
  methedsList: any = {};
  getIssuesList = {data: {trace_issues: [{number: 0}]}};
  isInit = true;

  constructor(public share: GlobalShareProvider, public businessTool: BusinessTool, public httpclient: HttpClientProvider) {

  }

  setdefaultsMethodData() {
    let df = this.businessTool.setDefaultsMethod(this.methedsList.game_ways, this.defaultData.data && this.defaultData.data.default_method_id, this.defaultData);
    if (df) {
      this.defaultsMethodData = df;
    }

  }

  loading: any;

  getParamaterToken(): tokenOnly {
    return {_token: this.share.user.token};
  }

  /**
   * 1.获取总玩玩法列表
   */
  async fetchMethedsList() {
    let data = await  this.httpclient.post(`/mobile-lotteries-h5/load-data/2/${this.share.getPid()}`, this.getParamaterToken());
    this.methedsList = data.data;
    this.setdefaultsMethodData();
    this.data = data;
    this.methedsList
  }

  /**
   * 2.获取默认数据
   */
  async getDefaultsMethods() {
    let defaultData = this.defaultData = await this.httpclient.post(`/mobile-lotteries-h5/load-data/1/${this.share.getPid()}?_=${Math.random()}`, this.getParamaterToken());
    let str = this.defaultData.data.lottery_balls;

    if (str) {
      if (/\s+?/.test(str)) {
        this.defaultData.data.lottery_balls = this.defaultData.data.lottery_balls.split(' ');
      } else {
        this.defaultData.data.lottery_balls = this.defaultData.data.lottery_balls.split('');
      }
    }

    if (defaultData.isSuccess) {
      defaultData.data.isnot11Ygame = !/11Y/.test(this.defaultData.data.game_name_en);
      if (this.isInit) {
        this.setdefaultsMethodData();
        this.isInit = false;
      }

      this.coundown(this.defaultData.data.current_time, this.defaultData.data.current_number_time)
    } else {
      this.share.showToast(defaultData.Msg,3000);
    }
  }

  /**
   * 3.获取奖期
   * @returns {any}
   */

  async getIssues() {
    let data = await  this.httpclient.post(`/mobile-lotteries-h5/load-data/3/${this.share.getPid()}`, this.getParamaterToken());
    this.getIssuesList = data;
  }

  outergetIssues(): Promise<any> {
    return this.httpclient.post(`/mobile-lotteries-h5/load-data/3/${this.share.getPid()}`, this.getParamaterToken());
  }

  clock: {
    'total': any,
    'days': any,
    'hours': any,
    'minutes': any,
    'seconds': any
  } = {
    'total': '',
    'days': '',
    'hours': '',
    'minutes': '',
    'seconds': ''
  }
  set: any;
  istimeout: boolean = false;


  coundownAgain() {
    clearInterval(this.set);
    this.getIssues();
    this.getDefaultsMethods();
  }

  coundown(startime: string, endtime: string) {
    let a = new Date(startime.replace(/-/g, '/')).getTime();
    let b = new Date(endtime.replace(/-/g, '/')).getTime();
    let c = b - a;
    clearInterval(this.set);
    this.istimeout = false;
    if (c > 1000) {
      this.set = setInterval(() => {
        c -= 1000;
        this.istimeout = c > 1000;
        this.clock = this.getTimeRemaining(c);
        if (!this.istimeout) {
          this.coundownAgain();
        }
      }, 1000);
    } else {

      this.istimeout = c > 1000;
      //this.coundownAgain();
      this.set = setInterval(() => {
        c -= 1000;
        this.istimeout = c > 1000;
        this.clock = this.getTimeRemaining(c);
        if (!this.istimeout) {
          this.coundownAgain();
        }
      }, 1000);

    }

  }

  getTimeRemaining(t) {
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      'total': t,
      'days': days,
      'hours': ('0' + hours).slice(-2),
      'minutes': ('0' + minutes).slice(-2),
      'seconds': ('0' + seconds).slice(-2)
    };
  }

  setPid(name: string) {
    this.share.setPid(name);
    this.pid = name;
  }

  getPid() {
    return this.pid;
  }


}
