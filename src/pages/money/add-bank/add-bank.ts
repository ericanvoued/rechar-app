import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Config} from "../../../config/config";
import {SetfundpasswordService} from "../../../providers/service/fund-service/setfundpassword-service";
import {BankcardService} from "../../../providers/service/fund-service/bankcard-service";

@IonicPage()
@Component({
  selector: 'page-add-bank',
  templateUrl: 'add-bank.html',
})
export class AddBankPage {

  RechargePage = "RechargePage";
  RemoveBindPage = "RemoveBindPage";
  bankcardIconMap = Config.bankcardIconMap;

  constructor(public navCtrl: NavController, public setfundpasswordService: SetfundpasswordService, public bankcardService: BankcardService) {

  }

  ionViewDidLoad() {

  }

  addBinddBankCard() {
    if (this.bankcardService.withdrawData.data.bank_cards.length >= 4) {
      this.navCtrl.pop();
      return;
    }
    if (this.setfundpasswordService.initialize()) return;

    if (this.bankcardService.isBindBankCard) {
      this.navCtrl.push("ValidBankPage");
    } else {
      this.navCtrl.push("BindBankPage");
    }

  }
  gopage(page,p){
    this.navCtrl.push(page,p);
  }

}
