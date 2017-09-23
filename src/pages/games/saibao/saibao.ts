import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {SubBusinessToolProvider} from "./sub-business-tool";
import {Gamelist} from "../../../providers/service/games/gamelist-service";
import {BasketServiceProvider} from "../../../providers/service/games/basket-service/basket-service";
import {SubCameconfigServiceProvider} from "./subCameconfigServiceProvider";

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
  chips: any={change:0,chip:10};

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

  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'unauthenticated');
  }

  private other() {
    this.menuCtrl.enable(false, 'unauthenticated');

  }

  changeChip(){
    if(!this.chips.change)
      this.chips.change=1;
    else
      this.chips.change=0;
  }

  selectChip(number){
    this.chips.change=0;
    this.chips.chip=number;
  }
}


