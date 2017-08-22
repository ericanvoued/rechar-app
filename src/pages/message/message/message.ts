import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {WebsidemessagesService} from "../../../providers/service/websidemessages-service";

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {


  constructor(public navCtrl: NavController, public websidemessagesService: WebsidemessagesService) {

  }

  ionViewDidLoad() {
    this.websidemessagesService.postRemoteServer();
  }

  go(a, b) {
    this.navCtrl.push(a,b);
  }
}
