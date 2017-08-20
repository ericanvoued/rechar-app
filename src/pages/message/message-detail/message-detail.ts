import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";

@IonicPage()
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetailPage {

  constructor(public navCtrl: NavController, public params: NavParams,public home:HomeServiceProvider) {
  }

  ionViewDidLoad() {
    this.home.getMessageServer(this.params.get('id'));
  }
}
