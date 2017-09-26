import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BetrecordDetailService} from "../../../../providers/service/betrecord-service/betrecord-detail-service";

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
  constructor(public navCtrl: NavController, public params: NavParams, public betrecordDetailService: BetrecordDetailService) {
    clearInterval(this.cccInterval);
    this.cccInterval = setInterval(()=>this.ccc = !this.ccc,1000);
  }
  ccc:boolean;
  cccInterval:any;

  statusName = {0: '待开奖', 1: '已撤销', 2: '未中奖', 3: '已中奖', 4: '已派奖', 5: '系统撤销'};

  ionViewDidLoad() {
    this.betrecordDetailService.betMoreDetailParameters = this.getIDs();
    this.betrecordDetailService.betDetailMoreRemoteServer();
  }
  getIDs(){
    return this.params.get('tplData') && this.params.get('tplData').successful && this.params.get('tplData').successful.map(v => v.id).join(',')
  }
}
