import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeServiceProvider} from "../../providers/service/home-service/home-service";

/**
 * Generated class for the NoticeListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

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

  pushPage(page){
    if(page) this.navCtrl.push(page);
  }
}
