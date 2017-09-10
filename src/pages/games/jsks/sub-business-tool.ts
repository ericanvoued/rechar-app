import {Injectable} from '@angular/core';
import {BusinessTool} from "../../../providers/tools/business-tool";

@Injectable()
export class SubBusinessToolProvider extends BusinessTool {
  constructor() {
    super();

  }

  initSetBussiness(c) {
    let bet_numberArrObj = [];
    let selectareaPair = [];
    let selectarea = [];

    c.ishezhi = /.hezhi$/.test(c.fullName_en);
    c.isertonghao = /ertonghao$/.test(c.fullName_en);
    c.issanlianhao = /santonghao|sanlianhao/.test(c.fullName_en);

    if (c.ishezhi) {
      bet_numberArrObj = selectareaPair = c.bet_number;
      selectarea = c.bet_number.map(v => false);
    } else {
      c.bet_number = this.threeArrToTwoArr(c.bet_number, c);
      if (c.isertonghao) {
        c.bet_number.splice(-1);
      }
    }

    bet_numberArrObj = selectareaPair = c.bet_number;
    if (c.leveltwo) {
      selectarea = c.bet_number.map(v => v.map(vv => false));
    } else {
      selectarea = c.bet_number.map(v => false);
    }


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
    //是否和值
    console.log(c);
    this._.observe(c.selectarea, 'update', () => {
      this.mainBussiness(c);
    });

    this._.observe(c.mutipleAndModeObj, 'update', () => {
      this.mainBussiness(c);
    });

  }

  threeArrToTwoArr(arr: Array<any>, c): Array<any> {
    if (arr[0] && Array.isArray(arr[0])) {
      c.leveltwo = false;
      if (arr[0][0] && Array.isArray(arr[0][0])) {
        c.leveltwo = true
      }
      return arr[0];
    }
    return arr;
  }

  mainBussiness(data) {
    this.findCounter(data.name_cn, data);
  }

  findCounter(name, obj) {
    obj.count = obj.selectarea.toString().replace(/false/g,'').split(',').filter(v=>v).length;;
    obj.totals = this.countsTotal(obj);
  }
}
