import {Component} from '@angular/core';
import {NavController, ViewController} from "ionic-angular";
import {GlobalShareProvider} from "../../providers/global-share/global-share";

@Component({
  selector: 'my-pop-over',
  templateUrl: 'my-pop-over.html'
})
export class MyPopOverComponent {
  text: string;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public share: GlobalShareProvider) {
  }

  async close(page, item?) {
    if ("GameRecordPage" == page) {
      await this.navCtrl.push(page, {title: '投注记录'});
    } else {
      await this.navCtrl.push(page, item);
    }
    this.viewCtrl.dismiss();
    this.share.moreType = 0;
  }

  async setRoot(page, item?) {
    await this.navCtrl.setRoot(page, item);
    this.viewCtrl.dismiss();
    this.share.moreType = 0;
  }
}
