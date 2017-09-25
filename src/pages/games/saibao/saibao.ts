import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {SubBusinessToolProvider} from "./sub-business-tool";
import {Gamelist} from "../../../providers/service/games/gamelist-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {SubCameconfigServiceProvider} from "./subCameconfigServiceProvider";
import * as $ from 'jquery';

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
    game1: {
      key: 'daxiaodanshuang',
      id: '243',
      data: [{p1: '大', s: '11~17', p2: '1:1', b: '1', g: [], t: 0}, {
        p1: '小',
        s: '4~10',
        p2: '1:1',
        b: '0',
        g: [],
        t: 0
      }, {
        p1: '单',
        s: '',
        p2: '1:1',
        b: '3',
        g: [],
        t: 0
      }, {p1: '双', s: '', p2: '1:1', b: '2', g: [], t: 0}]
    },
    game2: {
      key: 'dantiaoyishai',
      id: '238',
      data: [{p: 1, b: '1', g: [], t: 0}, {p: 2, b: '2', g: [], t: 0}, {p: 3, b: '3', g: [], t: 0}, {
        p: 4,
        b: '4',
        g: [],
        t: 0
      }, {
        p: 5,
        b: '5',
        g: [],
        t: 0
      }, {p: 6, b: '6', g: [], t: 0}]
    },
    game3: {
      key: 'erbutonghao',
      id: '240',
      data: [{p1: 1, p2: 2, b: '12', g: [], t: 0}, {p1: 1, p2: 3, b: '13', g: [], t: 0}, {
        p1: 1,
        p2: 4,
        b: '14',
        g: [],
        t: 0
      }, {
        p1: 1,
        p2: 5,
        b: '15',
        g: [],
        t: 0
      }, {p1: 1, p2: 6, b: '16', g: [], t: 0},
        {p1: 2, p2: 3, b: '23', g: [], t: 0}, {p1: 2, p2: 4, b: '24', g: [], t: 0}, {
          p1: 2,
          p2: 5,
          b: '25',
          g: [],
          t: 0
        }, {
          p1: 2,
          p2: 6,
          b: '26',
          g: [],
          t: 0
        }, {p1: 3, p2: 4, b: '34', g: [], t: 0},
        {p1: 3, p2: 5, b: '35', g: [], t: 0}, {p1: 3, p2: 6, b: '36', g: [], t: 0}, {
          p1: 4,
          p2: 5,
          b: '45',
          g: [],
          t: 0
        }, {
          p1: 4,
          p2: 6,
          b: '46',
          g: [],
          t: 0
        }, {p1: 5, p2: 6, b: '56', g: [], t: 0}]
    },
    game4: {
      key: 'hezhi',
      id: '242',
      data: [{n: '04', be: '60', b: '4', g: [], t: 0}, {n: '05', be: '30', b: '5', g: [], t: 0}, {
        n: '06',
        be: '18',
        b: '6',
        g: [],
        t: 0
      }, {
        n: '07',
        be: '12',
        b: '7',
        g: [],
        t: 0
      }, {n: '08', be: '8', b: '8', g: [], t: 0}, {n: '09', be: '6', b: '9', g: [], t: 0}, {
        n: '10',
        be: '6',
        b: '10',
        g: [],
        t: 0
      },
        {n: '11', be: '6', b: '11', g: [], t: 0}, {n: '12', be: '6', b: '12', g: [], t: 0}, {
          n: '13',
          be: '8',
          b: '13',
          g: [],
          t: 0
        }, {
          n: '14',
          be: '12',
          b: '14',
          g: [],
          t: 0
        }, {n: '15', be: '18', b: '15', g: [], t: 0}, {n: '16', be: '30', b: '16', g: [], t: 0}, {
          n: '17',
          be: '60',
          b: '17',
          g: [],
          t: 0
        }]
    },
    game5: {
      key: 'ertonghao',
      id: '241',
      data: [{p: 1, b: '11', g: [], t: 0}, {p: 2, b: '22', g: [], t: 0}, {p: 3, b: '33', g: [], t: 0}, {
        p: 4,
        b: '44',
        g: [],
        t: 0
      }, {
        p: 5,
        b: '55',
        g: [],
        t: 0
      }, {p: 6, b: '66', g: [], t: 0}]
    },
    game6: {key: 'santonghaotongxuan', id: '244', data: [{p: [1, 2, 3, 4, 5, 6], b: '0', g: [], t: 0}]},
    game7: {
      key: 'santonghao',
      id: '239',
      data: [{p: 1, b: '111', g: [], t: 0}, {p: 2, b: '222', g: [], t: 0}, {p: 3, b: '333', g: [], t: 0}, {
        p: 4,
        b: '444',
        g: [],
        t: 0
      }, {
        p: 5,
        b: '555',
        g: [],
        t: 0
      }, {p: 6, b: '666', g: [], t: 0}]
    }
  };

  constructor(public alertCtrl: AlertController, public share: GlobalShareProvider, public util: SubBusinessToolProvider, private  gameinfo: Gamelist, public basket: BasketServiceProvider, private gameconfigdata: SubCameconfigServiceProvider, public menuCtrl: MenuController, public navCtrl: NavController, public  navParams: NavParams, public toastCtrl: ToastController) {
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
    this.basket.totalAllCount = 0;
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

  clickItem(game, i, $event) {
    if (this.gameData.chips.change) {
      this.gameData.chips.change = 0;
      return;
    }
    for (let item in this.gameData) {
      if (item == game) {
        if (this.gameData.money - this.gameData.chips.chip < 0) {
          this.share.showToast('余额不足', 1000);
          return;
        }
        this.gameData[item].data[i].g.push(this.gameData.chips.chip);
        this.gameData[item].data[i].t += this.gameData.chips.chip;
        this.gameData.total += this.gameData.chips.chip;
        this.basket.totalAllCount = this.gameData.total * 10;
        this.gameData.money -= this.gameData.chips.chip;
        this.gameData.money = this.formatFloat(this.gameData.money, 4);
        this.gameData.last.push({name: game, id: i});
        this.setData();
        return;
      }
    }
  }

  setData() {
    this.basket.basketBall = [];
    let ball = {
      "jsId": 2,
      "wayId": "",
      "ball": null,
      "position": [],
      "viewBalls": "",
      "num": 1,
      "type": "",
      "onePrice": 2,
      "prize_group": 1950,
      "moneyunit": 0.01,
      "multiple": 0
    };
    for (let item in this.gameData) {
      if (item.indexOf('game') > -1) {
        for (let i = 0; i < this.gameData[item].data.length; i++) {
          if (this.gameData[item].data[i].t > 0) {
            ball.multiple = this.gameData[item].data[i].t * 50;
            ball.ball = this.gameData[item].data[i].b;
            ball.type = this.gameData[item].key;
            ball.wayId = this.gameData[item].id;
            this.basket.basketBall.push(ball);
          }
        }
      }
    }
  }

  goBuyBasket(obj) {
    console.log(this.basket.basketBall);
    if (this.gameData.total == 0) {
      this.share.showToast('请投注后再提交', 1000);
    } else {
      this.basket.saobaoSubmit(this.basket.basketBall, this);
    }
  }

  clearSelect() {
    for (let item in this.gameData) {
      if (item.indexOf('game') > -1) {
        for (let i = 0; i < this.gameData[item].data.length; i++) {
          this.gameData[item].data[i].g = [];
          this.gameData[item].data[i].t = 0;
        }
      }
    }
    this.gameData.last = [];
    this.gameData.total = 0;
    this.basket.totalAllCount = 0;
    this.gameData.money = this.share.balance.available;
    this.setData();
  }

  backSelect() {
    if (this.gameData.last.length == 0) return;
    let r = this.gameData.last.pop();
    for (let item in this.gameData) {
      if (item == r.name) {
        let m = this.gameData[item].data[r.id].g.pop();
        this.gameData[item].data[r.id].t -= m;
        this.gameData.total -= m;
        this.basket.totalAllCount = this.gameData.total * 10;
        this.gameData.money += m;
        this.gameData.money = this.formatFloat(this.gameData.money, 4);
        this.setData();
        return;
      }
    }
  }

  formatFloat(f: number, digit) {
    let m = Math.pow(10, digit);
    return parseInt((f * m) + '', 10) / m;
  }

  showAlert(data) {
    let alert = this.alertCtrl.create({
      title: '投注成功',
      message: "您可以通过”游戏记录“查询您的投注记录！"
    });
    alert.present();
  }

  submitSuccess(data) {
    this.showAlert(data);
    //this.navCtrl.push("BetDetailMorePage",data);
  }

  @ViewChild('saobaocontent') saobaocontent

  getvisableHeight(obj) {
    let t = obj.offsetTop;
    let t2 = obj.offsetLeft;

    while ((obj = obj.offsetParent)) {
      t += obj.offsetTop;
      t2 += obj.offsetLeft;
    }

    let scrollTop = $(this.saobaocontent.nativeElement).find('.scroll-content').scrollTop();
    return {top: t - scrollTop, left: t2};
  }
}


