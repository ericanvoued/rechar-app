import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";

@IonicPage()
@Component({
  selector: 'page-special-detail',
  templateUrl: 'special-detail.html',
})
export class SpecialDetailPage {

  constructor(public navCtrl: NavController, public params: NavParams,public home:HomeServiceProvider) {
  }

  ionViewDidLoad() {
    this.home.getSpecialSever();
  }

}
