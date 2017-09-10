import {Injectable} from '@angular/core';
import {BusinessTool} from "../../../providers/tools/business-tool";
import {LableMap} from "../game-common/labelmap";

@Injectable()
export class SubBusinessToolProvider extends BusinessTool {
  constructor() {
    super();

  }

  initSetBussiness(c) {
    if (c.ok) {
      return;
    }
    if (!c.ok) {
      c.ok = true;
    }
    let betarr = [];
    let bet_numberArrObj = betarr;
    let selectareaPair = betarr;
    let selectarea = [];

    this.createLabelAndBall(c);
    this.createLabelAndBallPair(c.bet_number, selectarea, bet_numberArrObj)
    c.modesArray = [1, 0.1, 0.01];
    let mutipleAndModeObj = {
      mode: 1,
      times: 1
    };

    c.mutipleAndModeObj = mutipleAndModeObj;
    c.bet_numberArrObj = bet_numberArrObj;
    c.selectarea = selectarea;
    c.selectareaPair = selectareaPair;

    c.count = 0;
    c.totals = 0;
    console.log(c);
    this._.observe(c.selectarea, 'update', () => {
      this.mainBussiness(c);
    });

    this._.observe(c.mutipleAndModeObj, 'update', () => {
      this.mainBussiness(c);
    });

  }

  createLabelAndBall(c) {
    let arr = [];
    let bn = c.bet_number;
    for (let key in bn) {
      let item = {};
      let v = bn[key];
      if (Array.isArray(v)) {
        if (typeof v[0] == 'string') {
          let narr = v[0].split('-');
          c.isnumberBall = true;
          item[LableMap.label[key]] = this.createNumberRange(narr[0], narr[1]);
        } else {
          //龙,虎
          c.islonghu = true;
          item[LableMap.label[key]] = v;
        }
      } else {
        c.isdansuang = true;
        item[LableMap.label[key]] = v.split(',').map(v1 => LableMap.label[v1]);
      }
      arr.push(item);
    }

    c.bet_number = arr;
  }


  mainBussiness(data) {
    this.findCounter(data.name_cn, data);
  }

  findCounter(name, obj) {
    obj.count = obj.selectarea.toString().replace(/false/g, '').split(',').filter(v => v).length;
    obj.totals = this.countsTotal(obj);
  }

  createLabelAndBallPair(bet_number: any,selectarea:Array<any>, bet_numberArrObj:Array<any>) {

    bet_number.forEach((v, k) => {
      let item: any = {};
      let originitem2: any = {};
      for (let key in v) {
        originitem2.key = item.key = key;
        item.value = v[key].map(v => false);
        originitem2.value = v[key].map(v => v);
      }
      selectarea.push(item);
      bet_numberArrObj.push(originitem2);
    });

  }
}
