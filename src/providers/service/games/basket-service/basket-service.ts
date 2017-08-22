import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../../../http-client/http-client";

import {BusinessTool} from "../../../tools/business-tool";
import {GameconfigServiceProvider} from "../gameconfig-service/gameconfig-service";
import {AlertController, LoadingController, ToastController} from "ionic-angular";
import {GlobalShareProvider} from "../../../global-share/global-share";
import {UserbalanceServiceProvider} from "../../userbalance-service/userbalance-service";

function PlatformDetected() {
  var userAgent = navigator.userAgent.toLowerCase();
  this.isIpad = !!userAgent.match(/ipad/i)
  this.isIphoneOs = !!userAgent.match(/iphone os/i)
  this.isAndroid = !!userAgent.match(/android/i);
  this.isCE = !!userAgent.match(/windows ce/i);
  this.isWM = !!userAgent.match(/windows mobile/i);
  this.isPhone = this.isIpad || this.isIphoneOs || this.isMidp || this.isUc7 || this.isUc || this.isAndroid || this.isCE || this.isWM;

}

var platformInstance = new PlatformDetected();


@Injectable()
export class BasketServiceProvider extends BusinessTool {
  basketData = [];
  basketDataValideArr = [];
  c = {name_cn: '', prize: 0};
  globalData: { globalMutile: number, trace: number };
  globalDataArr: Array<{ globalMutile: number, trace: number }>
  MinMutiple: { minmax_multiple: number, c: any };
  MinMutipleArr: Array<{ minmax_multiple: number, c: any }>
  totalAllCount: number;
  totalAllNum: number;
  gameId: any;
  traceWinStop: boolean = true;

  constructor(public loadingCtrl: LoadingController, public userbalance: UserbalanceServiceProvider, public alertCtrl: AlertController, public share: GlobalShareProvider, public toastCtrl: ToastController, public gameconfigure: GameconfigServiceProvider, private httpclient: HttpClientProvider) {
    super();

    this.globalData = {globalMutile: 1, trace: 1};
    this.globalDataArr = [this.globalData];

    this._.observe(this.globalDataArr, 'update', () => {
      this.whenUpdateGlobalData();
      this.whenUpdatebasketData();
    });

    this._.observe(this.basketData, () => {
      this.whenUpdatebasketData();
    });

    this.MinMutiple = {minmax_multiple: 0, c: {}};
    this.MinMutipleArr = [this.MinMutiple];
    this._.observe(this.MinMutipleArr, 'update', () => {
      this.whenUpdateGlobalData();
      this.whenUpdatebasketData();
    });


  }

  whenUpdatebasketData() {

    this.getMinMutipleAndTotalAllCount();
    if (!this.basketData.length)
      this.globalData.trace = 0;
    else if (!this.globalData.trace)
      this.globalData.trace = 1;

  }

  getMinMutipleAndTotalAllCount(): { minmax_multiple: number } {
    let min = this.basketData[0];
    this.totalAllCount = 0;
    this.totalAllNum = 0;
    this.basketData.forEach((v) => {
      this.totalAllCount += (v.mutipleAndModeObj.mode * v.mutipleAndModeObj.times * v.price * this.globalData.globalMutile * this.globalData.trace * v.count);
      this.totalAllCount = +this.totalAllCount.toFixed(4);
      this.totalAllNum += v.count;
      if (v.max_multiple < min.max_multiple) {
        min = v;
      }
    });

    if (min) {
      this.MinMutiple.minmax_multiple = min.max_multiple;
      this.MinMutiple.c = min;
    }
    else {
      if (this.MinMutiple) {
        this.MinMutiple.minmax_multiple = 0;
        this.MinMutiple.c = min;
      }
    }

    return this.MinMutiple;
  }

  whenUpdateGlobalData(): any {
    this.resetGlobalMutiple();
  }

  resetGlobalMutiple() {
    if (!this.basketData.length)
      this.globalData.globalMutile = 0;
    else if (this.globalData.globalMutile == 0)
      this.globalData.globalMutile = 1;


    if (this.MinMutiple.c && this.MinMutiple.c.mutipleAndModeObj && this.isBigerThenMutipleAndModeObj(this.MinMutiple.c)) {
      this.globalData.globalMutile -= 1;
      this.resetGlobalMutiple();
    }
  }

  isBigerThenMutipleAndModeObj(c): boolean {
    return this.MinMutiple.minmax_multiple < c.mutipleAndModeObj.times * this.globalData.globalMutile;
  }

  addDataToBasket(obj): boolean {
    if (obj.count) {
      this.addLabel(obj);
      this.c = obj;
      let validIndex = `${obj.fullName_en}/${obj.label}`;
      if (this.basketDataValideArr.indexOf(validIndex) == -1) {
        this.basketDataValideArr.push(validIndex);
        this.basketData.push(this.deepCloneObj(obj));
        obj.isRedudu = false;
        return true;
      } else {
        obj.isRedudu = true;
        return false;
      }
    } else {
      obj.isRedudu = false;
      return false;
    }

  }

  isNot11Y() {
    return this.gameconfigure.defaultData.data && this.gameconfigure.defaultData.data.isnot11Ygame;
  }

  private createLabel(arr: Array<any>, type): Array<any> {

    if (/hezhi|teshuhaoma/.test(type)) {
      return arr[0];
    }

    return arr.map((v) => {
      return this.isNot11Y() ? v.join('') : v.join(' ');
    });
  }

  addLabel(obj): void {
    obj.label = this.createLabel(this.pluckChooseBall(this.pluckBall(obj.bet_numberArrObj), obj.selectarea), obj.fullName_en);
  }

  pluckBall(a): Array<any> {
    let arr = [];
    for (let val of a) {
      arr.push(val.value.slice());
    }
    return arr;
  }

  hasChooseBall(arr: Array<any>): boolean {
    return arr.some((v: any[]) => {
      return v.some((v) => {
        return v;
      });
    });
  }

  pluckChooseBall(a: Array<any>, b: Array<any>): Array<any> {
    return a.map((v: Array<any>, k) => {
      return v.filter((v1, k1) => {
        return b[k][k1];
      });
    });

  }

  deleteItem(i) {
    this.basketData.splice(i, 1);
    this.basketDataValideArr.splice(i, 1);
  }

  clearAll() {
    this.basketData.splice(0, this.basketData.length);
    this.basketDataValideArr.splice(0, this.basketDataValideArr.length);
  }

  convertToBalls(a: Array<any>, b: Array<any>): Array<any> {
    return b.filter((v, k) => {
      return a[k];
    });

  }

  fiterBalls(v, name_en: string): any {
    if ("teshuhaoma" == name_en || /daxiaodanshuang/.test(name_en) || /quwei\.|longhu\.|hezhi\./.test(v.fullName_en)) {
      var arr = v.selectarea;
      return arr.map((v) => {
        let b = this.range(0, v.length);
        return this.convertToBalls(v, b).join('');
      }).join('|');
    }
    return v.label;
  }

  customprizeGroupchoose: any;
  setcustomprizeGroupchoose: any;

  getBallsString(): string {
    let balls = [];
    let ReplaceBallNameByMap = {
      '5单0双': '5',
      '4单1双': '4',
      '3单2双': '3',
      '2单3双': '2',
      '1单4双': '1',
      '0单5双': '0'
    }

    this.basketData.forEach((v, key) => {
      let ball = this.fiterBalls(v, v.name_en);

      if (Array.isArray(ball) && /单|双/.test(ball[0])) {
        for (let key in ReplaceBallNameByMap) {
          ball[0] = ball[0].replace(key, ReplaceBallNameByMap[key]);
        }
        let tmp = ball[0].split('').join(' ').split(/\s+/).join(' ');
        ball = tmp;
      }

      balls.push({
        "jsId": key,
        "wayId": v.id,
        "ball": Array.isArray(ball) ? ball.join('|') : ball,
        "position": [],
        "viewBalls": v.label.join('|'),
        "num": v.count,
        "type": v.fullName_en,
        "onePrice": 2,
        "prize_group": this.setcustomprizeGroupchoose,
        "moneyunit": v.mutipleAndModeObj.mode,
        "multiple": v.mutipleAndModeObj.times * this.globalData.globalMutile
      })
    });

    return this.encrypt(JSON.stringify(balls));
  }

  getOrderIssure(): Object {
    let orderIssue = {};
    for (let i = 0; i < this.globalData.trace; i++) {
      orderIssue[this.gameconfigure.getIssuesList.data.trace_issues[i].number] = 1;
    }

    return orderIssue;
  }

  getSubmitData(): Object {

    return {
      "gameId": this.gameId,
      "isTrace": +(this.globalData.trace > 1),
      "traceWinStop": +this.traceWinStop,
      "traceStopValue": 1,
      "balls": this.getBallsString(),
      "orders": this.getOrderIssure(),
      "amount": this.totalAllCount,
      is_encoded: 1,
      _token: this.share.user.token,
      bet_source: platformInstance.isAndroid ? 'android' : (platformInstance.isIphoneOs ? 'ios' : 'h5')
    }

  }

  messages(obj): void {
    if (obj.isRedudu) {
      let toast = this.toastCtrl.create({
        message: '订单已经存在',
        duration: 1000,
        position: 'middle'
      });
      toast.present(toast);
    }
  }

  getRondomBall() {
    this.findRandom(this.c.name_cn, this.c);
    this.mainBussiness(this.c);
    let isSucess = this.addDataToBasket(this.c);
    if (isSucess) {
      let toast = this.toastCtrl.create({
        message: '注单添加成功',
        duration: 1000,
        position: 'bottom'
      });
      toast.present(toast);
    } else {
      this.messages(this.c);
    }

  }

  finishRequest(data,goContent) {
    if (data.isSuccess) {
      goContent.navCtrl.push("BetSuccessPage", data);
      this.clearAll();
    } else {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: data.type && data.type == "bet-too-fast" ? "您投注太快了,请休息会再来" : data.Msg,
        buttons: ['确定']
      });
      alert.present();
    }
    this.userbalance.getBalaceAgain();
  }

  submitProcessing = false;

  async submit(goContent) {
    if (!(this.basketData.length)) {
      let toast = this.toastCtrl.create({
        message: '号码篮不能为空',
        duration: 1000,
        position: 'middle'
      });
      toast.present(toast);
    } else {

      if (this.submitProcessing) {
        return;
      }
      this.submitProcessing = true;

      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles'
      });

      this.loading.present();

      await this.gameconfigure.outergetIssues();
      this.submitProcessing = false;
      this.loading.dismiss();
      let data = await this.doSubmint();
      this.finishRequest(data,goContent);
    }
  }

  doSubmint() {
    return this.httpclient.post(`/mobile-lotteries-h5/bet/${this.gameconfigure.getPid()}`, this.getSubmitData());
  }

  loading: any;

}
