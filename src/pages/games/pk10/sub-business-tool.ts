import {Injectable} from '@angular/core';
import {BusinessTool} from "../../../providers/tools/business-tool";
import {LableMap} from "../game-common/labelmap";

@Injectable()
export class SubBusinessToolProvider extends BusinessTool {
  constructor() {
    super();

  }

  initSetBussiness(c) {
    let bet_numberArrObj = [];
    let selectareaPair = [];
    let selectarea = [];


    this.createLabelAndBall(c);
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
    let bn = c.bet_number
    for (let key in bn) {
      let item = {};
      let v = bn[key];
      if (Array.isArray(v)) {
        if (typeof v[0] == 'string') {
          let narr = v[0].split('-');
          item[LableMap.label[key]] = this.createNumberRange(narr[0], narr[1]);
        } else {
          //龙,虎
          item[LableMap.label[key]] = [...this.createLongHu(v[0], v[1])];
        }
      } else {
        item[LableMap.label[key]] = v.split(',').map(v1 => LableMap.label[v1]);
      }
      arr.push(item);
    }

    c.bet_number = arr;
  }

  createLongHu(longlen: number, hulen: number) {
    let longArr = this.createArrayByLenth(longlen);
    let huArr = this.createArrayByLenth(hulen);
    return [...longArr.map(v => '龙'), ...huArr.map(v => '虎')]
  }

  createArrayByLenth(len: number): Array<any> {
    let arr = [];
    for (let i = 0; i <= len; i++) {
      arr.push(false)
    }
    return arr;
  }

  mainBussiness(data) {
    this.findCounter(data.name_cn, data);
  }

  findCounter(name, obj) {
    obj.count = obj.selectarea.toString().replace(/false/g, '').split(',').filter(v => v).length;
    ;
    obj.totals = this.countsTotal(obj);
  }
}
