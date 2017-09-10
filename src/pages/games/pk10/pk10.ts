import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Config} from "../../../config/config";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {Gamelist} from "../../../providers/service/games/gamelist-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {Effect} from "../game-common/effect";
import {SubBusinessToolProvider} from "./sub-business-tool";
import {SubCameconfigServiceProvider} from "./subCameconfigServiceProvider";

/**
 * Generated class for the Pk10Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pk10',
  templateUrl: 'pk10.html',
})
export class Pk10Page extends Effect {
  methodGroup: {
    a: any;
    b: any;
    c: any;
  };
  ballLabelMap = Config.ballLabelMap;
  private cccInterval: number;
  ccc: boolean;

  constructor(public share: GlobalShareProvider, public util: SubBusinessToolProvider, private  gameinfo: Gamelist, public basket: BasketServiceProvider, private gameconfigdata: SubCameconfigServiceProvider, public menuCtrl: MenuController, public navCtrl: NavController, public  navParams: NavParams, public toastCtrl: ToastController) {
    super();

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

  tmpComformMethod(a, b, c) {
    this.methodGroup = {
      a, b, c
    }
  }

  logDrag() {
    this.handler();
  }

  ionViewDidLoad() {
    this.initEffect();
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'unauthenticated');
  }

  private other() {
    this.menuCtrl.enable(false, 'unauthenticated');
    clearInterval(this.cccInterval);
    this.cccInterval = setInterval(() => {
      this.ccc = !this.ccc;
    }, 800);

  }

  setGrounpChoose(name, arr, value) {
    this.util.daxiaodanshuangqing(arr, name, value);
  }

  comformMethod() {
    if (this.methodGroup && this.methodGroup.a && this.methodGroup.b && this.methodGroup.c) {
      this.gameconfigdata.defaultsMethodData.a = this.methodGroup.a;
      this.gameconfigdata.defaultsMethodData.b = this.methodGroup.b;
      this.gameconfigdata.defaultsMethodData.c = this.methodGroup.c;
    }
    console.log("this.gameconfigdata.defaultsMethodData:", this.gameconfigdata.defaultsMethodData);
  }

  goHelpPage() {
    this.navCtrl.push("PlayHelpPage");
  }

  mindus(obj) {
    obj.mutipleAndModeObj.times--;
    obj.mutipleAndModeObj.times = Math.max(obj.mutipleAndModeObj.times, 1);

  }

  pluse(obj) {
    obj.mutipleAndModeObj.times++;
    obj.mutipleAndModeObj.times = Math.min(obj.mutipleAndModeObj.times, obj.max_multiple);

  }

  pluseOrmindusOnInput = debounce((obj, e) => {
    this.pluseOrmindus(obj, e);
  }, 1000)

  pluseOrmindus(obj, e) {
    let v = +e.target.value;
    if (v <= 1) {
      obj.mutipleAndModeObj.times = 1;
    } else if (v >= obj.max_multiple) {
      obj.mutipleAndModeObj.times = obj.max_multiple;
    } else {
      obj.mutipleAndModeObj.times = v;
    }
    e.target.value = obj.mutipleAndModeObj.times;
  }

  modeChange(obj, mode) {
    if (!obj.oldmax_multiple) {
      obj.oldmax_multiple = obj.max_multiple;
    }

    obj.mutipleAndModeObj.mode = mode;
    obj.max_multiple = obj.oldmax_multiple / mode;
    this.restTimesWhenChangeMode(obj);
  }

  restTimesWhenChangeMode(obj) {
    if (obj.mutipleAndModeObj.times >= obj.max_multiple) {
      obj.mutipleAndModeObj.times = obj.max_multiple;
    }
  }

  messages(obj): void {
    let hasChoose = this.basket.hasChooseBall(obj.selectarea);
    if (hasChoose && (obj.count == 0)) {
      let toast = this.toastCtrl.create({
        message: obj.bet_note,
        duration: 1000,
        position: 'middle'
      });
      toast.present(toast);
    } else if (obj.isRedudu) {
      let toast = this.toastCtrl.create({
        message: '订单已经存在',
        duration: 1000,
        position: 'middle'
      });

      toast.present(toast);
    } else {
      let toast = this.toastCtrl.create({
        message: '请选择注单',
        duration: 1000,
        position: 'middle'
      });
      toast.present(toast);
    }
  }

  addBall(obj): boolean {
    let isSucess = this.basket.addDataToBasket(obj);

    if (isSucess) {
      this.clear(obj);
      let toast = this.toastCtrl.create({
        message: '注单添加成功',
        duration: 1000,
        position: 'bottom'
      });
      toast.present(toast);
    } else {
      this.messages(obj);
    }

    return isSucess;
  }

  goBuybasket(obj) {
    let isSucess = this.basket.addDataToBasket(obj);

    if (isSucess || this.share.basketData.length) {
      this.clear(obj);
      this.navCtrl.push("BuyBasketPage", {nav: this.navParams.get('nav')});
    } else {
      this.messages(obj);
    }

  }

  randomBall(obj) {
    this.util.findRandom(obj.name_cn, obj);
  }

  clear(obj) {
    obj.mutipleAndModeObj.times = 1;
    this.util.clearBall(obj.selectarea);
  }

}


function debounce(func, wait?, immediate?) {
  var timeout, args, context, timestamp, result;

  var later = function () {
    var last = new Date().getTime() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
