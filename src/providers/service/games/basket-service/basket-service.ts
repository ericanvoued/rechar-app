import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../../../http-client/http-client";
import {BusinessTool} from "../../../tools/business-tool";
import {GameconfigServiceProvider} from "../gameconfig-service/gameconfig-service";
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
  ispk10: any;
  basketData = [];
  basketBall = [];
  c = {name_cn: '', prize: 0};

  totalAllCount: number;
  totalAllNum: number;
  gameId: any;
  traceWinStop: boolean = true;

  constructor(public userbalance: UserbalanceServiceProvider, public share: GlobalShareProvider, public gameconfigure: GameconfigServiceProvider, private httpclient: HttpClientProvider) {
    super();

    this.share.globalData = {globalMutile: 1, trace: 1}
    this._.observe(this.share.globalData, 'update', () => {
      this.whenUpdateGlobalData();
      this.whenUpdatebasketData();
    });

    this._.observe(this.share.basketData, () => {
      this.whenUpdatebasketData();
    });

    this.share.MinMutiple = {minmax_multiple: 0, c: {}};
    this._.observe(this.share.MinMutiple, 'update', () => {
      this.whenUpdateGlobalData();
      this.whenUpdatebasketData();
    });


  }

  whenUpdatebasketData() {

    this.getMinMutipleAndTotalAllCount();
    if (!this.share.basketData.length)
      this.share.globalData.trace = 0;
    else if (!this.share.globalData.trace)
      this.share.globalData.trace = 1;

  }

  getMinMutipleAndTotalAllCount(): { minmax_multiple: number } {
    let min = this.share.basketData[0];
    this.totalAllCount = 0;
    this.totalAllNum = 0;
    let totalAllCount = 0;
    this.share.basketData.forEach((v) => {
      totalAllCount += (v.mutipleAndModeObj.mode * v.mutipleAndModeObj.times * v.price * this.share.globalData.globalMutile * this.share.globalData.trace * v.count);

      totalAllCount = +totalAllCount.toFixed(4);

      this.totalAllNum += v.count;
      if (v.max_multiple < min.max_multiple) {
        min = v;
      }
    });
    this.totalAllCount = totalAllCount;


    if (min) {
      this.share.MinMutiple.minmax_multiple = min.max_multiple;
      this.share.MinMutiple.c = min;
    }
    else {
      if (this.share.MinMutiple) {
        this.share.MinMutiple.minmax_multiple = 0;
        this.share.MinMutiple.c = min;
      }
    }

    return this.share.MinMutiple;
  }

  whenUpdateGlobalData(): any {
    this.resetGlobalMutiple();
  }

  resetGlobalMutiple() {
    if (!this.share.basketData.length)
      this.share.globalData.globalMutile = 0;
    else if (this.share.globalData.globalMutile == 0)
      this.share.globalData.globalMutile = 1;


    if (this.share.MinMutiple.c && this.share.MinMutiple.c.mutipleAndModeObj && this.isBigerThenMutipleAndModeObj(this.share.MinMutiple.c)) {
      this.share.globalData.globalMutile -= 1;
      this.resetGlobalMutiple();
    }
  }

  isBigerThenMutipleAndModeObj(c): boolean {
    return this.share.MinMutiple.minmax_multiple < c.mutipleAndModeObj.times * this.share.globalData.globalMutile;
  }

  addDataToBasket(obj): boolean {
    if (obj.count) {
      this.addLabel(obj);
      this.c = obj;
      let validIndex = `${obj.fullName_en}/${obj.label}`;
      if (this.share.basketDataValideArr.indexOf(validIndex) == -1) {
        this.share.basketDataValideArr.push(validIndex);
        this.share.basketData.push(this.deepCloneObj(obj));
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

  addLabelPK10(obj): void {

    obj.label = [];
    obj.isliangmianpan = /^liangmianpan/.test(obj.fullName_en);
    obj.iszhixuanhezhi = /^zhixuanhezhi/.test(obj.fullName_en);
    if (obj.isliangmianpan) {
      obj.selectarea.forEach((v, k) => {
        if (Array.isArray(v.value)) {
          let tmp = [];
          v.value.forEach((v1, k1) => {
            if (obj.isnotnumberSymble) {
              v1 && tmp.push(obj.bet_numberArrObj[k].value[k1].join('-'));
            } else {
              v1 && tmp.push(obj.bet_numberArrObj[k].value[k1]);
            }
          });
          if (obj.isnotnumberSymble) {
            obj.label.push(tmp.join(','));
          } else {
            obj.label.push(tmp.join(''));
          }
        }
      });
    } else {
      obj.selectarea.forEach((v, k) => {
        if (Array.isArray(v.value)) {
          let tmp = [];
          v.value.forEach((v1, k1) => {
            v1 && tmp.push(obj.bet_numberArrObj[k].value[k1]);
          });
          if (obj.iszhixuanhezhi) {
            obj.label.push(tmp.join('|'));
          } else {
            obj.label.push(tmp.join(''));
          }
        }
      });

    }

  }

  addDataToBasketPK10(obj) {
    if (obj.count) {
      this.addLabelPK10(obj);
      this.c = obj;
      let validIndex = `${obj.fullName_en}/${obj.label}`;
      if (this.share.basketDataValideArr.indexOf(validIndex) == -1) {
        this.share.basketDataValideArr.push(validIndex);
        this.share.basketData.push(this.deepCloneObj(obj));
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

  addDataToBasketK3(obj) {
    if (obj.count) {
      this.addLabelk3(obj);
      this.c = obj;
      let validIndex = `${obj.fullName_en}/${obj.label}`;
      if (this.share.basketDataValideArr.indexOf(validIndex) == -1) {
        this.share.basketDataValideArr.push(validIndex);
        this.share.basketData.push(this.deepCloneObj(obj));
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

  addLabelk3(obj): void {
    if (obj.leveltwo) {
      obj.label = [];
      obj.selectarea.forEach((v, k) => {
        if (v.some(v => v)) {
          v.forEach((v1, k1) => {
            v1 && obj.label.push(obj.bet_numberArrObj[k][k1]);
          });
        }
      });
    } else {
      obj.label = [];
      obj.selectarea.forEach((v, k) => {
        v && obj.label.push(obj.bet_numberArrObj[k]);
      });

    }
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
      if (Array.isArray(v)) {
        return v.some((v) => {
          return v;
        });
      }
      return v;
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
    this.share.basketData.splice(i, 1);
    this.share.basketDataValideArr.splice(i, 1);
  }

  clearAll() {
    this.share.basketData.splice(0, this.share.basketData.length);
    this.share.basketDataValideArr.splice(0, this.share.basketDataValideArr.length);
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
    if (this.ispk10) {
      return this.getStringGenertorispk10();
    } else if (+(this.share.gameId) == 71) {
      return this.encrypt(JSON.stringify(this.basketBall));
    }
    return this.getStringGenertor();
  }

  private getStringGenertorispk10(): string {

    let balls = [];

    this.share.basketData.forEach((v, key) => {
      let ball = this.fiterBalls(v, v.name_en);

      if (v.iszhixuanhezhi) {
        ball = v.label;
      } else if (v.isliangmianpan || /caichehao.dingweidan.dingweidan/.test(v.fullName_en)) {
        ball = [];
        v.selectarea.forEach(v3 => {
          if (Array.isArray(v3.value)) {
            let tmp = [];
            v3.value.forEach((v4, k4) => {
              v4 && tmp.push(k4);
            });
            ball.push(tmp.join(''));
          }
        });
      }

      balls.push({
        "jsId": 2,
        "wayId": v.id,
        "ball": Array.isArray(ball) ? ball.join('|') : ball,
        "position": [],
        "viewBalls": v.label.join('|'),
        "num": v.count,
        "type": v.fullName_en,
        "onePrice": 2,
        "prize_group": this.setcustomprizeGroupchoose,
        "moneyunit": v.mutipleAndModeObj.mode,
        "multiple": v.mutipleAndModeObj.times * this.share.globalData.globalMutile
      });

    });

    return this.encrypt(JSON.stringify(balls));
  }

  private getStringGenertor(): string {
    let balls = [];
    let ReplaceBallNameByMap = {
      '5单0双': '5',
      '4单1双': '4',
      '3单2双': '3',
      '2单3双': '2',
      '1单4双': '1',
      '0单5双': '0'
    }

    this.share.basketData.forEach((v, key) => {
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
        "multiple": v.mutipleAndModeObj.times * this.share.globalData.globalMutile
      })
    });

    return this.encrypt(JSON.stringify(balls));
  }

  getOrderIssure(): Object {
    let orderIssue = {};
    for (let i = 0; i < this.share.globalData.trace; i++) {
      orderIssue[this.gameconfigure.getIssuesList.data.trace_issues[i].number] = 1;
    }

    return orderIssue;
  }

  saobogetSubmitData(balls): Object {
    let totalamont = 0;
    balls.forEach((v) => {
      totalamont += (v.moneyunit * 2 * v.multiple * v.num);
    });

    let orderIssue = {};
    for (let i = 0; i < 1; i++) {
      orderIssue[this.gameconfigure.getIssuesList.data.trace_issues[i].number] = 1;
    }

    return {
      "gameId": this.share.gameId,
      "isTrace": 0,
      "traceWinStop": 0,
      "traceStopValue": 0,
      "balls": this.encrypt(JSON.stringify(balls)),
      "orders": orderIssue,
      "amount": totalamont,
      is_encoded: 1,
      _token: this.share.user.token,
      bet_source: platformInstance.isAndroid ? 'android' : (platformInstance.isIphoneOs ? 'ios' : 'h5')
    }

  }

  getSubmitData(): Object {
    return {
      "gameId": this.share.gameId,
      "isTrace": +(this.share.globalData.trace > 1),
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

  postData: any = {
    "gameId": "71",
    "isTrace": 0,
    "traceWinStop": 0,
    "traceStopValue": 0,
    "balls": [],
    "orders": {},
    "amount": "",
    "_token": "",
  };


  messages(obj): void {
    if (obj.isRedudu)
      this.share.showToast('订单已经存在', 1000);
  }

  getRondomBall() {
    this.findRandom(this.c.name_cn, this.c);
    this.mainBussiness(this.c);
    let isSucess = this.addDataToBasket(this.c);
    if (isSucess) {
      this.share.showToast('注单添加成功', 1000, 'bottom');
    } else {
      this.messages(this.c);
    }

  }

  finishRequest(data, goContent) {
    if (data.isSuccess) {
      goContent.navCtrl.push("BetSuccessPage", data);
      this.clearAll();
    } else {
      this.share.showAlert('', ['确定'], data.type && data.type == "bet-too-fast" ? "您投注太快了,请休息会再来" : data.Msg);
    }
    this.userbalance.getBalaceAgain();
  }

  submitProcessing = false;

  async saobaoSubmit(balls) {
    if (this.submitProcessing) return;
    this.submitProcessing = true;
    this.share.showLoading();
    this.gameconfigure.getIssuesList = await this.gameconfigure.outergetIssues();
    this.loading && this.loading.dismiss();
    let data = await this.saobodoSubmint(balls);
    this.submitProcessing = false;

    if (data.isSuccess) {
      this.clearAll();
    } else {
      this.share.showAlert('', ['确定'], data.type && data.type == "bet-too-fast" ? "您投注太快了,请休息会再来" : data.Msg);
    }
    this.userbalance.getBalaceAgain();
  }

  async submit(goContent) {
    this.ispk10 = this.share.ispk10;
    if (!(this.share.basketData.length)) {
      this.share.showToast('号码篮不能为空', 1000);
    } else {
      if (this.submitProcessing) return;
      this.submitProcessing = true;
      this.share.showLoading();
      this.gameconfigure.getIssuesList = await this.gameconfigure.outergetIssues();
      this.loading && this.loading.dismiss();
      let data = await this.doSubmint();
      this.submitProcessing = false;

      this.finishRequest(data, goContent);
    }
  }

  saobodoSubmint(balls) {
    return this.httpclient.post(`/mobile-lotteries-h5/bet/${this.share.getPid()}`, this.saobogetSubmitData(balls));
  }

  doSubmint() {
    return this.httpclient.post(`/mobile-lotteries-h5/bet/${this.share.getPid()}`, this.getSubmitData());
  }

  loading: any;

}
