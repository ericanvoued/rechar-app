import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MoneySericeProvider} from "../../../providers/service/money-serice/money-serice";
import {ModifyPasswordService} from "../../../providers/service/fund-service/modify-password-service";

@IonicPage()
@Component({
  selector: 'page-manage-catalogue',
  templateUrl: 'manage-catalogue.html',
})
export class ManageCataloguePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modifyPasswordServiceextends:ModifyPasswordService) {
  }

  pushPage(page) {
    if (page) this.navCtrl.push(page);
  }
}
