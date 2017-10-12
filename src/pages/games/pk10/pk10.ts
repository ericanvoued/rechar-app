import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {Effect} from "../../effect";
import {SubBusinessToolProvider} from "./sub-business-tool";
import {SubCameconfigServiceProvider} from "./subCameconfigServiceProvider";
import {LableMap} from "../game-common/labelmap";

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
  ballLabelMap = LableMap.label;

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

  tmpComformMethod(a, b, c) {
    this.methodGroup = {a, b, c}
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

  setGrounpChoose(name, arr, value) {
    this.util.daxiaodanshuangqing(arr, name, value);
  }

  comformMethod() {
    if (this.methodGroup && this.methodGroup.a && this.methodGroup.b && this.methodGroup.c) {
      this.gameconfigdata.defaultsMethodData.a = this.methodGroup.a;
      this.gameconfigdata.defaultsMethodData.b = this.methodGroup.b;
      this.gameconfigdata.defaultsMethodData.c = this.methodGroup.c;
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
    if (!obj.oldmax_multiple) obj.oldmax_multiple = obj.max_multiple;
    obj.mutipleAndModeObj.mode = mode;
    obj.max_multiple = obj.oldmax_multiple / mode;
    this.restTimesWhenChangeMode(obj);
  }

  restTimesWhenChangeMode(obj) {
    if (obj.mutipleAndModeObj.times >= obj.max_multiple)
      obj.mutipleAndModeObj.times = obj.max_multiple;
  }

  messages(obj): void {
    let hasChoose = this.basket.hasChooseBall(obj.selectarea);
    if (hasChoose && (obj.count == 0)) {
      this.share.showToast(obj.bet_note,1000,'middle');
    } else if (obj.isRedudu) {
      this.share.showToast('订单已经存在',1000,'middle');
    } else {
      this.share.showToast('请选择注单',1000,'middle');
    }
  }

  addBall(obj): boolean {
    let isSucess = this.basket.addDataToBasketPK10(obj);
    if (isSucess) {
      this.clear(obj);
      this.share.showToast('注单添加成功',1000,'bottom');
    } else {
      this.messages(obj);
    }
    return isSucess;
  }

  goBuybasket(obj) {
    let isSucess = this.basket.addDataToBasketPK10(obj);
    if (isSucess || this.share.basketData.length) {
      this.clear(obj);
      this.navCtrl.push("BuyBasketPage", {nav: this.navParams.get('nav'), ispk10: true});
    } else {
      this.messages(obj);
    }
  }

  randomBall(obj) {
    this.util.findRandom(obj.name_cn, obj);
  }

  clear(obj) {
    obj.mutipleAndModeObj.times = 1;
    this.clearBall(obj.selectarea);
  }

  clearBall(arr: Array<any>) {
    arr.forEach(v => {
      if (Array.isArray(v.value))
        v.value.forEach((v1, k1, array) => array[k1] = false);
    });
  }
}
