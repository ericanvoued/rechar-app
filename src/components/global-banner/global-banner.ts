import { Component } from '@angular/core';
import {AlertController, ModalController, NavController} from "ionic-angular";
import {LoginServiceProvider} from "../../providers/service/login-serice/login-service";
import {GlobalShareProvider} from "../../providers/global-share/global-share";

/**
 * Generated class for the GlobalBannerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'global-banner',
  templateUrl: 'global-banner.html'
})
export class GlobalBannerComponent {

  text: string;

  constructor(public alertCtrl: AlertController,public user:LoginServiceProvider,public nav: NavController, public modalCtrl: ModalController, public share: GlobalShareProvider) {

  }

}
