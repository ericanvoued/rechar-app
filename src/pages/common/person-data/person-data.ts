import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {GlobalShareProvider} from "../../../providers/global-share/global-share";

@IonicPage()
@Component({
  selector: 'page-person-data',
  templateUrl: 'person-data.html',
})
export class PersonDataPage {
  constructor(public share: GlobalShareProvider) {
  }
}
