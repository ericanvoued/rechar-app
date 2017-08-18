import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";
import {Config} from "../../../config/config";

@IonicPage()
@Component({
  selector: 'page-notice-detail',
  templateUrl: 'notice-detail.html',
})
export class NoticeDetailPage {
  Config = Config;
  constructor(public navCtrl: NavController, public homeService: HomeServiceProvider, public params: NavParams) {}

  ionViewDidLoad() {
    this.homeService.getRemoteServer();
  }
}
