import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-personal-profiles',
  templateUrl: 'personal-profiles.html',
})
export class PersonalProfilesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }



  lineService() {
    // function PlatformDetected() {
    //   var userAgent: any = navigator.userAgent.toLowerCase();
    //   this.isIpad = userAgent.match(/ipad/i) == "ipad";
    //   this.isIphoneOs = userAgent.match(/iphone os/i) == "iphone os";
    //   this.isMidp = userAgent.match(/midp/i) == "midp";
    //   this.isUc7 = userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    //   this.isUc = userAgent.match(/ucweb/i) == "ucweb";
    //   this.isAndroid = userAgent.match(/android/i) == "android";
    //   this.isCE = userAgent.match(/windows ce/i) == "windows ce";
    //   this.isWM = userAgent.match(/windows mobile/i) == "windows mobile";
    //   this.isPhone = this.isIpad || this.isIphoneOs || this.isMidp || this.isUc7 || this.isUc || this.isAndroid || this.isCE || this.isWM;
    // }
    // var platformInstance = new PlatformDetected();
    // if (platformInstance.isIphoneOs) {
    //   window.open(`https://vp9.live800.com/live800/chatClient/chatbox.jsp?companyID=80000041&configID=2083&codeType=custom&info=loginname=${this.usr.tmpUserInfo.data.username}&name=${this.usr.tmpUserInfo.data.username}&hashCode=&amp;timestamp=${Date.now()}`,'_blank')
    //   return;
    // }
    // let profileModal = this.modalCtrl.create(Onlineservice, {data: {username:this.usr.tmpUserInfo.data.username}, title: ''});
    // profileModal.present();
  }


  pushPage(page,item?){
    if(page) this.navCtrl.push(page,item);
  }
}
