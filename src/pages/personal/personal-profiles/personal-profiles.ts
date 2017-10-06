import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {Config} from "../../../config/config";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";
import {BalanceProvider} from "../../../providers/global-share/balance";

@IonicPage()
@Component({
  selector: 'page-personal-profiles',
  templateUrl: 'personal-profiles.html',
})
export class PersonalProfilesPage {
  userTypeMap = Config.userTypeMap;
  moneyDisplay=false;
  star= '******';

  constructor(public balance:BalanceProvider,public bankcard:BankcardService,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public share:GlobalShareProvider) {
    this.balance.getBalance();
    this.bankcard.getRemoteServer();
  }

  lineService() {
    if (this.share.plat='ios') {
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
