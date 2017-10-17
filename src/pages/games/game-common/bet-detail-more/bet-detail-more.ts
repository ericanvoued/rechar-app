import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BetrecordDetailService} from "../../../../providers/service/betrecord-service/betrecord-detail-service";
import {GlobalShareProvider} from "../../../../providers/global-share/global-share";

/**
 * Generated class for the BetDetailMorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bet-detail-more',
  templateUrl: 'bet-detail-more.html',
})
export class BetDetailMorePage {
  constructor(public share:GlobalShareProvider,public navCtrl: NavController, public params: NavParams, public betrecordDetailService: BetrecordDetailService) {
    this.share.setTimer('divTimer',1000);
  }

  statusName = {0: '待开奖', 1: '已撤销', 2: '未中奖', 3: '已中奖', 4: '已派奖', 5: '系统撤销'};

  ionViewDidLoad() {
    this.betrecordDetailService.betMoreDetailParameters = this.getIDs();
    this.betrecordDetailService.betDetailMoreRemoteServer();
  }

  getIDs(): string {
    if (this.params.get('tplData') && this.params.get('tplData').successful) {
      let ids = this.params.get('tplData').successful.map(v => v.id);
      return `${ids.join(',')}&istrace=${this.params.get('istrace')}`;
    }
    return "";
  }
}
