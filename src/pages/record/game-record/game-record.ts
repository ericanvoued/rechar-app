import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {GlobalShareProvider} from "../../../providers/global-share/global-share";
import {DateFormat} from "../../../providers/tools/date";
import {HomeServiceProvider} from "../../../providers/service/home-service/home-service";
import {observe} from "../../../providers/tools/observe";

let _ = new observe();

@IonicPage()
@Component({
  selector: 'page-game-record',
  templateUrl: 'game-record.html',
})
export class GameRecordPage {
  eventOne = {timeStarts: '', timeEnds: '', id: null};
  isTitle = false;
  gameData: any;
  backData: any;
  statusName = {0: '待开奖', 1: '已撤销', 2: '未中奖', 3: '已中奖', 4: '已派奖', 5: '系统撤销'};
  pet1 = 9;
  titleIndex = 0;

  constructor(public share: GlobalShareProvider, public home: HomeServiceProvider, public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams) {
    this.recordLogin();
  }

  recordLogin() {
    this.isTitle = (this.params.get('title') != '投注记录');
    if (this.isTitle) this.titleIndex = 1;
    let startDay = new Date();
    startDay.setDate(startDay.getDate() - 7);
    let endDay = new Date();
    endDay.setDate(endDay.getDate() + 1);
    this.eventOne = {
      timeStarts: DateFormat.format(startDay),
      timeEnds: DateFormat.format(endDay),
      id: null
    };
    _.observe(this.eventOne, () => this.changeParameter(this.titleIndex));
    this.viewCtrl.didEnter.subscribe(() => {
      _.observe(this.share.parameters, async () => {
        await this.getRecordData(this.titleIndex);
        if (!this.isTitle) {
          this.backData = this.filterData(this.share.gameRecord.data);
        } else {
          this.backData = this.share.chargeRecord.data;
        }
        this.gameData = this.backData;
      });
    });
  }

  async getRecordData(index) {
    if (index != 1) {
      await this.home.postRemoteServer();
    } else {
      await this.home.postRecordServer();
    }
  }

  clickFilter(num) {
    this.pet1 = num;
    this.gameData = this.filterData(this.backData);
  }

  filterData(inputData) {
    if (this.pet1 == 9) return inputData;
    let outputData = [];
    inputData && inputData.forEach((v) => {
      if (v.status == this.pet1) outputData.push(v)
    });
    return outputData;
  }

  changeParameter(index) {
    this.share.parameters[index].end = this.eventOne.timeEnds;
    this.share.parameters[index].start = this.eventOne.timeStarts;
    this.share.parameters[index].lottery_id = this.eventOne.id;
  }

  goDetail(item) {
    if (this.params.get('title') == '投注记录') {
      this.navCtrl.push('BetDatailPage', item);
    }
  }
}
