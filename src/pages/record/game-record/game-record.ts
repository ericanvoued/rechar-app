import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {JSONObserver} from 'json-observer'
import {BetrecordServiceProvider} from "../../../providers/betrecord-service/betrecord-service";
import {DateFormat} from "../../../providers/tools/date";


@IonicPage()
@Component({
  selector: 'page-game-record',
  templateUrl: 'game-record.html',
})
export class GameRecordPage {
  RechargePage = "RechargePage";
  eventOne: any;
  lotterGroup = {id: null};
  yearReg = /[\d]{4}-/;
  isbianzhang = false;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams, public betrecordService: BetrecordServiceProvider) {

    let d = new Date();
    d.setDate(d.getDate() - 7);  //7天前的日期


    this.eventOne = {
      timeStarts: d,
      timeEnds: new Date()
    };

    this.isbianzhang = params.get('title') != '投注记录';


    new JSONObserver(this.eventOne, () => {
      this.searchRecords();
    });
    new JSONObserver(this.lotterGroup, () => {
      this.searchRecords();
    });
    this.searchRecords();
    this.viewCtrl.didEnter.subscribe(() => {
      if (params.get('title') == '投注记录') {
        this.betrecordService.postRemoteServer();
        new JSONObserver(this.betrecordService.parameters, () => {
          this.betrecordService.postRemoteServer();
        });
      } else {
        this.betrecordService.getRemoteServer();
        new JSONObserver(this.betrecordService.parametersbianzhang, () => {
          this.betrecordService.getRemoteServer();
        });
      }

    });
  }

  searchRecords() {
    if (this.isbianzhang) {
      this.betrecordService.parametersbianzhang.end = this.eventOne.timeEnds;
      this.betrecordService.parametersbianzhang.start = this.eventOne.timeStarts;
      this.betrecordService.parametersbianzhang.lottery_id = this.lotterGroup.id;

    } else {
      this.betrecordService.parameters.end = this.eventOne.timeEnds;
      this.betrecordService.parameters.start = this.eventOne.timeStarts;
      this.betrecordService.parameters.lottery_id = this.lotterGroup.id;

    }
  }

  statusName = {0: '待开奖', 1: '已撤销', 2: '未中奖', 3: '已中奖', 4: '已派奖', 5: '系统撤销'};
  pet1: string = "win-1";

  ionViewDidLoad() {

  }

  goBetDetailPage(item) {
    if (this.params.get('title') == '投注记录') {
      this.navCtrl.push(this.RechargePage, item)
    }
  }
}
