import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";

@IonicPage()
@Component({
  selector: 'page-special-offer',
  templateUrl: 'special-offer.html',
})
export class SpecialOfferPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public home:HomeServiceProvider) {
  }

  ionViewDidLoad() {
    this.home.getSpecialSever();
  }

  pushPage(page,parameter){
    if(page) this.navCtrl.push(page,parameter);
  }
}
