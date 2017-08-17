import { Component } from '@angular/core';
import {PopoverController} from "ionic-angular";

@Component({
  selector: 'more',
  templateUrl: 'more.html'
})
export class MoreComponent {
  text: string;
  constructor(public popoverCtrl: PopoverController) {}

  presentPopover(ev) {
    let popover = this.popoverCtrl.create('MyPopOverComponent');
    popover.present({
      ev: ev
    });
  }
}
