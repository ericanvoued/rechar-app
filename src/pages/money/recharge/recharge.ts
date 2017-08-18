import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Config} from "../../../config/config";

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {
  bankcardIconMap = Config.bankcardIconMap;
  constructor() {
  }


}
