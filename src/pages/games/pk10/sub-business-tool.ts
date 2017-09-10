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
    let inputData=this.getCount(obj.selectarea,obj.bet_numberArrObj);
    if(obj.fullName_cn.indexOf('猜排位')>-1){
      obj.count = this.countArrPK10(inputData);
    }else{
      obj.count = this.countArr(inputData);
    }
    obj.totals = this.countsTotal(obj);
  }

  countArr(data){
    let total = 0;
    for(let i=0;i<data.length;i++) total+=data[i].length;
    return total;
  }

  getCount(data,back){
    let outputData=[];
    for(let i=0;i<data.length;i++){
      let lineData=[];
      for(let j=0;j<data[i].value.length;j++){
        if(data[i].value[j]) lineData.push(back[i].value[j]);
      }
      outputData.push(lineData);
    }
    return outputData;
  }

  countArrPK10(data) {
    let total = 0;
    let start = 0;
    let flag = [];
    if (data.constructor != Array) return total;
    for (let i = 0; i < data.length; i++) {
      let endFlag = 0;
      for (let j = start; j < data[i].length; j++) {
        endFlag = 0;
        if (j == data[i].length - 1) endFlag = 1;
        if (this.checkUse(data[i][j], flag)) continue;
        if (i == data.length - 1) {
          total++;
        } else {
          flag.push({index: j, number: data[i][j]});
          start = 0;
          endFlag = 0;
          break;
        }
      }
      if (endFlag) {
        while (endFlag || start == data[i].length) {
          if (!flag.length) return total;
          start = flag[flag.length - 1].index + 1;
          flag.pop();
          endFlag = 0;
          i--;
        }
        i--;
      }
    }
    return total;
  }

  checkUse(number, data) {
    for (let i = 0; i < data.length; i++) {
      if (number == data[i].number) return true;
    }
    return false;
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
