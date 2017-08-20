import { Component } from '@angular/core';
import {NavController, ViewController} from "ionic-angular";

@Component({
  selector: 'my-pop-over',
  templateUrl: 'my-pop-over.html'
})
export class MyPopOverComponent {
  text: string;
  constructor(public viewCtrl: ViewController,public navCtrl: NavController) {
  }

  close(page) {
    this.navCtrl.push(page);
    this.viewCtrl.dismiss();
  }
}
