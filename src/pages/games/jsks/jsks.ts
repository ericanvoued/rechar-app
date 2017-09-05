import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Effect} from "../../home/effect";
/**
 * Generated class for the JsksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jsks',
  templateUrl: 'jsks.html',
})
export class JsksPage extends Effect{

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
    this.initEffect();
  }

  ionViewDidLoad() {

  }

}
