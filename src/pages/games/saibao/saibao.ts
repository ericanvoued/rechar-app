import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {SubBusinessToolProvider} from "./sub-business-tool";
import {Gamelist} from "../../../providers/service/games/gamelist-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {SubCameconfigServiceProvider} from "./subCameconfigServiceProvider";
import * as $ from 'jquery';

/**
 * Generated class for the SaibaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saibao',
  templateUrl: 'saibao.html',
})
export class SaibaoPage {
  gameData: any = {
    total: 0,
    money: 0,
    chips: {change: 0, chip: 10, show: [[1, 2, 5, 10, 20], [50, 100, 500, 1000, 5000]]},
    last: [],
    game1: [{p1: '大', s: '11~17', p2: '1:1', g: [], t: 0}, {p1: '小', s: '4~10', p2: '1:1', g: [], t: 0}, {
      p1: '单',
      s: '',
      p2: '1:1',
      g: [],
      t: 0
    }, {p1: '双', s: '', p2: '1:1', g: [], t: 0}],
    game2: [{p: 1, g: [], t: 0}, {p: 2, g: [], t: 0}, {p: 3, g: [], t: 0}, {p: 4, g: [], t: 0}, {
      p: 5,
      g: [],
      t: 0
    }, {p: 6, g: [], t: 0}],
    game3: [{p1: 1, p2: 2, g: [], t: 0}, {p1: 1, p2: 3, g: [], t: 0}, {p1: 1, p2: 4, g: [], t: 0}, {
      p1: 1,
      p2: 5,
      g: [],
      t: 0
    }, {p1: 1, p2: 6, g: [], t: 0},
      {p1: 2, p2: 3, g: [], t: 0}, {p1: 2, p2: 4, g: [], t: 0}, {p1: 2, p2: 5, g: [], t: 0}, {
        p1: 2,
        p2: 6,
        g: [],
        t: 0
      }, {p1: 3, p2: 4, g: [], t: 0},
      {p1: 3, p2: 5, g: [], t: 0}, {p1: 3, p2: 6, g: [], t: 0}, {p1: 4, p2: 5, g: [], t: 0}, {
        p1: 4,
        p2: 6,
        g: [],
        t: 0
      }, {p1: 5, p2: 6, g: [], t: 0}],
    game4: [{n: '04', b: '60', g: [], t: 0}, {n: '05', b: '30', g: [], t: 0}, {n: '06', b: '18', g: [], t: 0}, {
      n: '07',
      b: '12',
      g: [],
      t: 0
    }, {n: '08', b: '8', g: [], t: 0}, {n: '09', b: '6', g: [], t: 0}, {n: '10', b: '6', g: [], t: 0},
      {n: '11', b: '6', g: [], t: 0}, {n: '12', b: '6', g: [], t: 0}, {n: '13', b: '8', g: [], t: 0}, {
        n: '14',
        b: '12',
        g: [],
        t: 0
      }, {n: '15', b: '18', g: [], t: 0}, {n: '16', b: '30', g: [], t: 0}, {n: '17', b: '60', g: [], t: 0}],
    game5: [{p: 1, g: [], t: 0}, {p: 2, g: [], t: 0}, {p: 3, g: [], t: 0}, {p: 4, g: [], t: 0}, {
      p: 5,
      g: [],
      t: 0
    }, {p: 6, g: [], t: 0}],
    game6: [{p: [1, 2, 3, 4, 5, 6], g: [], t: 0}],
    game7: [{p: 1, g: [], t: 0}, {p: 2, g: [], t: 0}, {p: 3, g: [], t: 0}, {p: 4, g: [], t: 0}, {
      p: 5,
      g: [],
      t: 0
    }, {p: 6, g: [], t: 0}]
  };

  // postData:any={
  //   "gameId": "71",
  //   "isTrace": 0,
  //   "traceWinStop": 1,
  //   "traceStopValue": 1,
  //   "balls": [
  //     {
  //       "jsId": 0?,
  //       "wayId": "69"?,
  //       "ball": "2|7|7"?,
  //       "position": [],
  //       "viewBalls": "2|7|7"?,
  //       "num": 1,
  //       "type": "housan.zhixuan.fushi"?,
  //       "onePrice": 2,
  //       "prize_group": 1950,
  //       "moneyunit": 0.1,
  //       "multiple": 1?
  //     }
  //   ],
  //   "orders": {
  //     "?": 1
  //   },
  //   "amount": "?",
  //   "is_encoded": 1,
  //   "_token": "?",
  //   "bet_source": "?"
  // };

  constructor(public share: GlobalShareProvider, public util: SubBusinessToolProvider, private  gameinfo: Gamelist, public basket: BasketServiceProvider, private gameconfigdata: SubCameconfigServiceProvider, public menuCtrl: MenuController, public navCtrl: NavController, public  navParams: NavParams, public toastCtrl: ToastController) {
    this.other();
    let nav = this.navParams.get('nav') || {};
    let gamenav = nav;
    this.gameconfigdata.setPid(gamenav.pid);
    this.gameconfigdata.fetchMethedsList();
    this.share.gameId = nav && nav.pid;
    gameconfigdata.getDefaultsMethods();
    gameconfigdata.isInit = true;
    gameconfigdata.getIssues();
    this.gameinfo.getRecord();
    basket.clearAll();
    this.menuCtrl.enable(false, 'unauthenticated');
  }


  ionViewDidLoad() {
    this.gameData.money = this.share.balance.available;
    this.setData();
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'unauthenticated');
  }

  private other() {
    this.menuCtrl.enable(false, 'unauthenticated');

  }

  changeChip() {
    if (!this.gameData.chips.change)
      this.gameData.chips.change = 1;
    else
      this.gameData.chips.change = 0;
  }

  selectChip(number) {
    this.gameData.chips.change = 0;
    this.gameData.chips.chip = number;
  }

  clickItem(game, i) {
    if (this.gameData.chips.change) {
      this.gameData.chips.change = 0;
      return;
    }
    for (let item in this.gameData) {
      if (item == game) {
        if (this.gameData.money - this.gameData.chips.chip < 0) return;
        this.gameData[item][i].g.push(this.gameData.chips.chip);
        this.gameData[item][i].t += this.gameData.chips.chip;
        this.gameData.total += this.gameData.chips.chip;
        this.gameData.money -= this.gameData.chips.chip;
        this.gameData.money = this.formatFloat(this.gameData.money, 4);
        this.gameData.last.push({name: game, id: i});
        this.setData();
        return;
      }
    }
  }

  setData() {
    //   let userAgent = navigator.userAgent.toLowerCase();
    //   let userText=!!userAgent.match(/android/i)?'android':(!!userAgent.match(/iphone os/i)?'ios':'h5');


  }

  clearSelect() {
    for (let item in this.gameData) {
      if (item.indexOf('game') > -1) {
        for (let i = 0; i < this.gameData[item].length; i++) {
          this.gameData[item][i].g = [];
          this.gameData[item][i].t = 0;
        }
      }
    }
    this.gameData.last = [];
    this.gameData.total = 0;
    this.gameData.money = this.share.balance.available;
  }

  backSelect() {
    if (this.gameData.last.length == 0) return;
    let r = this.gameData.last.pop();
    for (let item in this.gameData) {
      if (item == r.name) {
        let m = this.gameData[item][r.id].g.pop();
        this.gameData[item][r.id].t -= m;
        this.gameData.total -= m;
        this.gameData.money += m;
        this.gameData.money = this.formatFloat(this.gameData.money, 4);
        return;
      }
    }
  }

  formatFloat(f: number, digit) {
    var m = Math.pow(10, digit);
    return parseInt((f * m) + '', 10) / m;
  }

  getvisableHeight(obj){
    var t = obj.offsetTop;
    var t2 = obj.offsetLeft;

    while ((obj = obj.offsetParent)) {
      t += obj.offsetTop;
      t2 += obj.offsetLeft;
    }

    var scrollTop = $('.scroll-content').scrollTop();
    return {top: t - scrollTop, left: t2};
  }
}


