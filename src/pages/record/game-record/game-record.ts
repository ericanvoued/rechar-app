import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {JSONObserver} from 'json-observer'
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {DateFormat} from "../../../providers/tools/date";
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";

@IonicPage()
@Component({
  selector: 'page-game-record',
  templateUrl: 'game-record.html',
})
export class GameRecordPage {
  eventOne = {timeStarts: '', timeEnds: ''};
  lotteryGroup = {id: null};
  yearReg = /[\d]{4}-/;
  isTitle = false;
  gameData = [];
  statusName = {0: '待开奖', 1: '已撤销', 2: '未中奖', 3: '已中奖', 4: '已派奖', 5: '系统撤销'};
  pet1 = 9;
  titleIndex = 0;

  constructor(public share: GlobalShareProvider, public home: HomeServiceProvider, public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams) {
    this.recordLogin();
  }

  async recordLogin() {
    this.isTitle = (this.params.get('title') != '投注记录');
    if (this.isTitle) this.titleIndex = 1;
    let d = new Date();
    d.setDate(d.getDate() - 7);
    this.eventOne = {
      timeStarts: DateFormat.format(d),
      timeEnds: DateFormat.format(new Date())
    };
    this.changeParameter(this.titleIndex);
    await this.getRecordData(this.titleIndex);
    this.viewCtrl.didEnter.subscribe(() => {
      new JSONObserver(this.share.parameters[this.titleIndex], () => this.getRecordData(this.titleIndex));
    });
    if (!this.isTitle) {
      this.gameData = this.share.gameRecord.data;
      new JSONObserver(this.share.gameRecord.data, () => this.gameData = this.share.gameRecord.data);
    } else {
      this.gameData = this.share.chargeRecord.data;
      new JSONObserver(this.share.chargeRecord.data, () => this.gameData = this.share.chargeRecord.data);
    }
    this.gameData = this.filterByTime(this.gameData);
    new JSONObserver(this.eventOne, () => this.gameData = this.filterByTime(this.gameData));
    new JSONObserver(this.lotteryGroup, () => this.gameData = this.filterByTime(this.gameData));
    if (!this.isTitle) {
      this.gameData = this.filterData(this.gameData);
      new JSONObserver(this.gameData, () => this.gameData = this.filterData(this.gameData));
      new JSONObserver(this.pet1, () => this.gameData = this.filterData(this.gameData));
    }
  }

  async getRecordData(index) {
    if (index != 1) {
      await this.home.postRemoteServer();
    } else {
      await this.home.postRecordServer();
    }
  }

  filterByTime(inputData) {
    let outputData = [];
    inputData.forEach((v) => {
      if (this.timeCheck(v.created_at)) outputData.push(v);
    });
    if(!this.lotteryGroup.id) return outputData;
    let loryData = [];
    outputData.forEach((v) => {
      if (v.lottery_id==this.lotteryGroup.id) loryData.push(v);
    });
    return loryData;
  }

  timeCheck(checkTime){
    return checkTime >= this.eventOne.timeStarts && checkTime < this.eventOne.timeEnds;
  }

  filterData(inputData) {
    if (this.pet1 == 9) return inputData;
    let outputData = [];
    inputData.forEach((v) => {
      if (v.status == this.pet1) outputData.push(v)
    });
    return outputData;
  }

  changeParameter(index) {
    this.share.parameters[index].end = this.eventOne.timeEnds;
    this.share.parameters[index].start = this.eventOne.timeStarts;
    this.share.parameters[index].lottery_id = this.lotteryGroup.id;
  }

  goDetail(item) {
    if (this.params.get('title') == '投注记录')
      this.navCtrl.push('BetDetailPage', item)
  }
}
