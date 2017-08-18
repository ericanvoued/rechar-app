import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Effect} from "../game-common/effect";
import {Config} from "../../../config/config";
import {BusinessTool} from "../../../providers/tools/business-tool";
import {GameconfigServiceProvider} from "../../../providers/service/games/gameconfig-service/gameconfig-service";
import {GamerecordComponent} from "../../../components/gamerecord/gamerecord";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";

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

  constructor(public gamerecord: GamerecordComponent,public basket: BasketServiceProvider, private gameconfigdata: GameconfigServiceProvider,private util: BusinessTool,public menuCtrl: MenuController, public navCtrl: NavController, public  navParams: NavParams, public toastCtrl: ToastController) {
    super();
    this.other();

    let nav = this.navParams.get('nav');
    let gamenav = nav;
    this.gameconfigdata.setPid(gamenav.pid);
    this.gameconfigdata.fetchMethedsList();
    basket.gameId = nav && nav.pid;

    gameconfigdata.getDefaultsMethods();
    gameconfigdata.isInit = true;
    gameconfigdata.getIssues();
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
}
