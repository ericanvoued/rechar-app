import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Effect} from "../game-common/effect";
import {Config} from "../../../config/config";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {GamerecordComponent} from "../../../components/gamerecord/gamerecord";

/**
 * Generated class for the CqsscPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cqssc',
  templateUrl: 'cqssc.html',
})
export class CqsscPage extends Effect {
  methodGroup: {
    a: any;
    b: any;
    c: any;
  };
  ballLabelMap = Config.ballLabelMap;
  private cccInterval: number;
  ccc: boolean;

  constructor(public gamerecord: GamerecordComponent,public basket: BasketServiceProvider,public menuCtrl: MenuController, public navCtrl: NavController, public  navParams: NavParams, public toastCtrl: ToastController) {
    super();
    this.other();
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
}
