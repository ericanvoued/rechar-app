import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";

@IonicPage()
@Component({
  selector: 'page-notice-list',
  templateUrl: 'notice-list.html',
})
export class NoticeListPage {

  constructor(public navCtrl: NavController,public homeService: HomeServiceProvider, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.homeService.getRemoteServer();
  }

  pushPage(page,parameter){
    if(page) this.navCtrl.push(page,parameter);
  }
}
