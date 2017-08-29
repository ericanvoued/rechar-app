import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";
import {GlobalShareProvider} from "../../../providers/global-share/global-share";

@IonicPage()
@Component({
  selector: 'page-bet-datail',
  templateUrl: 'bet-datail.html',
})
export class BetDatailPage {
  statusName = {0: '待开奖', 1: '已撤销', 2: '未中奖', 3: '已中奖', 4: '已派奖', 5: '系统撤销'};
  bet_winning_number = [];
  id: any;

  constructor(public share: GlobalShareProvider, public navCtrl: NavController, public params: NavParams, public home: HomeServiceProvider) {

  }

  biz() {
    this.share.presentLoadingDefault();
    if (!this.params.get('id')) {
      this.getID();
    } else {
      this.id = this.params.get('id');
      this.getDetailData();
    }
  }

  async getDetailData() {
    await this.home.getBetDetailServer(this.id);
    let str = this.home.betDetail.winning_number;
    if (str) this.bet_winning_number = str.replace(/\s+?/ig, "").split('');

  }

  async getID() {
    await this.home.postRemoteServer();
    this.id = this.share.gameRecord.data[0].id;
    this.getDetailData();
  }

  ionViewDidLoad() {
    this.biz();
  }
}
