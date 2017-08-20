import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public home:HomeServiceProvider) {
  }

  ionViewDidLoad() {
    this.home.postMessageServer();
  }

  goPage(page,item) {
    this.navCtrl.push(page,item);
  }
}
