import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {Config} from "../../../config/config";
import {BalanceProvider} from "../../../providers/service/balance/balance";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";

@IonicPage()
@Component({
  selector: 'page-personal-profiles',
  templateUrl: 'personal-profiles.html',
})
export class PersonalProfilesPage {
  userTypeMap = Config.userTypeMap;
  moneyDisplay=false;
  star= '******';

  constructor(public bankcard:BankcardService,public modalCtrl: ModalController,public balance:BalanceProvider,public navCtrl: NavController, public navParams: NavParams,public share:GlobalShareProvider) {
    this.balance.getUserBalance();
    this.bankcard.getRemoteServer();
  }

  lineService() {
    function PlatformDetected() {
      var userAgent: any = navigator.userAgent.toLowerCase();
      this.isIpad = userAgent.match(/ipad/i) == "ipad";
      this.isIphoneOs = userAgent.match(/iphone os/i) == "iphone os";
      this.isMidp = userAgent.match(/midp/i) == "midp";
      this.isUc7 = userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      this.isUc = userAgent.match(/ucweb/i) == "ucweb";
      this.isAndroid = userAgent.match(/android/i) == "android";
      this.isCE = userAgent.match(/windows ce/i) == "windows ce";
      this.isWM = userAgent.match(/windows mobile/i) == "windows mobile";
      this.isPhone = this.isIpad || this.isIphoneOs || this.isMidp || this.isUc7 || this.isUc || this.isAndroid || this.isCE || this.isWM;
    }
    var platformInstance = new PlatformDetected();
    if (platformInstance.isIphoneOs) {
      window.open(`https://vp9.live800.com/live800/chatClient/chatbox.jsp?companyID=80000041&configID=2083&codeType=custom&info=loginname=${this.share.user.username}&name=${this.share.user.username}&hashCode=&amp;timestamp=${Date.now()}`,'_blank')
      return;
    }
    let profileModal = this.modalCtrl.create('Onlineservice', {data: {username:this.share.user.username}, title: ''});
    profileModal.present();
  }

  hideMoney(){
    this.moneyDisplay = !this.moneyDisplay;
  }

  pushPage(page,item?){
    if(page) this.navCtrl.push(page,item);
  }
}
