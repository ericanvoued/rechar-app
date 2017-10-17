import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Config} from "../../../config/config";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {SubBusinessToolProvider} from "./sub-business-tool";
import {SubCameconfigServiceProvider} from "./subCameconfigServiceProvider";
import {Effect} from "../../effect";

@IonicPage()
@Component({
  selector: 'page-jsks',
  templateUrl: 'jsks.html',
})
export class JsksPage extends Effect {
  c: any = {selectarea: [], selectareaPair: []};
  b: any = {selectarea: [], selectareaPair: []};
  a: any = {selectarea: [], selectareaPair: []};

  methodGroup: {
    a: any;
    b: any;
    c: any;
  };
  ballLabelMap = Config.ballLabelMap;

  constructor(public share: GlobalShareProvider, public util: SubBusinessToolProvider, public basket: BasketServiceProvider, private gameconfigdata: SubCameconfigServiceProvider, public menuCtrl: MenuController, public navCtrl: NavController, public  navParams: NavParams, public toastCtrl: ToastController) {
    super();
    this.share.setTimer('divTimer',800);
    this.gameconfigdata.fetchMethedsList();
    gameconfigdata.getDefaultsMethods();
    gameconfigdata.isInit = true;
    gameconfigdata.getIssues();
    basket.clearAll();
    this.menuCtrl.enable(false, 'unauthenticated');
  }

  selectall(arr: Array<any>) {
    if (arr.every(v => v)) {
      arr.forEach((v, k, arr) => arr[k] = false);
    } else {
      arr.forEach((v, k, arr) => arr[k] = true);
    }

  }

  tmpComformMethod(a, b, c) {
    this.methodGroup = {
      a, b, c
    }
  }

  ionViewDidLoad() {
    this.initEffect();
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'unauthenticated');
  }

  setGrounpChoose(name, arr, value) {
    this.util.daxiaodanshuangqing(arr, name, value);
  }

  comformMethod() {
    if (this.methodGroup && this.methodGroup.a && this.methodGroup.b && this.methodGroup.c) {
      this.a = this.gameconfigdata.defaultsMethodData.a = this.methodGroup.a;
      this.b = this.gameconfigdata.defaultsMethodData.b = this.methodGroup.b;
      this.c = this.gameconfigdata.defaultsMethodData.c = this.methodGroup.c;
    }

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

  pluseOrmindusOnInput = this.debounce((obj, e) => this.pluseOrmindus(obj, e), 1000)

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
      this.share.showToast(obj.bet_note, 1000);
    } else if (obj.isRedudu) {
      this.share.showToast('订单已经存在', 1000);
    } else {
      this.share.showToast('请选择注单', 1000);
    }
  }

  addBall(obj): boolean {
    let isSucess = this.basket.addDataToBasketK3(obj);

    if (isSucess) {
      this.clear(obj);
      this.share.showToast('注单添加成功', 1000);
    } else {
      this.messages(obj);
    }

    return isSucess;
  }

  goBuybasket(obj) {
    let isSucess = this.basket.addDataToBasketK3(obj);

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
