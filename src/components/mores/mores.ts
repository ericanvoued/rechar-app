import { Component } from '@angular/core';
import {PopoverController} from "ionic-angular";
import {MyPopOverComponent} from "../my-pop-over/my-pop-over";

@Component({
  selector: 'mores',
  templateUrl: 'mores.html'
})
export class MoresComponent {
  text: string;
  constructor(public popoverCtrl: PopoverController) {}
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MyPopOverComponent);
    popover.present({
      ev: myEvent
    });
  }
}
