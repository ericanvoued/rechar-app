import {Injectable} from '@angular/core';
import {GameUtil} from './game-util';
import * as CryptoJS from 'crypto-js';
import {Config} from '../../config/config';
import {observe} from "./observe";
let _ = new observe();

@Injectable()
export class BusinessTool extends GameUtil {
  private createNumberRange(a, b) {
    let numbarArr = [];
    let flag = a;
    let numA = +a;
    let numB = +b;
    if (isNaN(numA)) return [];
    for (; numA <= numB; numA++) {
      let createZore = '0';
      if (flag.length == 2 && numA < 10) {
        createZore += numA;
      } else {
        createZore = ('' + numA);
      }
      numbarArr.push(createZore);
    }
    return numbarArr;
  }

  private createSelectArrarModel(a, b) {
    let numbarArr = [];
    if (isNaN(+a)) return [];
    for (; a <= b; a++) {
      numbarArr.push(false);
    }
    return numbarArr;
  }

  _: any

  constructor() {
    super();
    this._ = _;
  }

  private filterMethod(methodsData) {
    try {
      for (let ii = 0; ii < methodsData.length; ii++) {
        let a = methodsData[ii];
        for (let b of a.children) {
          for (let i = 0; i < b.children.length; i++) {
            let c = b.children[i];
            if (/danshi|hunhezuxuan/.test(c.name_en)) {
              b.children.splice(i, 1);
              i--;
            }
          }
        }

        if (/renxuan/.test(a.name_en)) {
          methodsData.splice(ii, 1);
          ii--;
        }
      }

    } catch (e) {
      return false;
    }
    return true;

  }

  private initSetBussiness(c) {

    let bet_numberArrObj = [];
    let selectarea = [];
    let selectareaPair = [];
    c.isdanshi = true;
    c.isdantuo = /dantuo/.test(c.name_en);
    for (let key in c.bet_number) {
      c.isdanshi = /danshi/.test(c.fullName_en);
      let isnotnumberSymble = /,/.test(c.bet_number[key]);
      if (isnotnumberSymble) {
        var n;
        if (/\)/.test(c.bet_number[key])) {
          n = c.bet_number[key].replace(/\),/g, ')|').split('|');
        } else {
          n = c.bet_number[key].split(',');
        }

        let arrRange = n.map((v) => {
          return Config.ballLabelMap[v];
        });

        bet_numberArrObj.push({key: key, value: arrRange, isnotnumberSymble: isnotnumberSymble, showgroup: true});
        selectareaPair.push(arrRange);
        selectarea.push(this.createSelectArrarModel(0, arrRange.length));

      } else {

        let n = c.bet_number[key].split('-');
        let arrRange = this.createNumberRange(n[0], n[1]);

        bet_numberArrObj.push({
          key: key,
          value: arrRange,
          isnotnumberSymble: isnotnumberSymble,
          showgroup: (n[0] == 0 || ((!c.isdantuo) && n[0].length > 1) )
        });

        selectareaPair.push(arrRange);


        selectarea.push(this.createSelectArrarModel(n[0], n[1]));
      }

    }

    c.isbaodan = /包胆/.test(c.name_cn);

    c.modesArray = [1, 0.1, 0.01];
    let mutipleAndModeObj = {
      mode: 1,
      times: 1
    };

    c.mutipleAndMode = [mutipleAndModeObj];
    c.mutipleAndModeObj = mutipleAndModeObj;
    c.bet_numberArrObj = bet_numberArrObj;
    c.selectarea = selectarea;
    c.selectareaPair = selectareaPair;
    c.count = 0;
    c.totals = 0;

    _.observe(c.selectarea, 'update', () => {
      this.mainBussiness(c);
    });

    _.observe(c.mutipleAndMode, 'update', () => {
      this.mainBussiness(c);
    });

  }

  setDefaultsMethod(methodsData, defaultMethodId, defaultData): any {
    this.defaultData = defaultData;
    if (!this.filterMethod(methodsData)) return;
    if (!defaultMethodId || !methodsData) {
      return null;
    }

    let obj: any;
    let ii = 0;
    for (let a of methodsData) {
      for (let b of a.children) {
        let i = 0;
        for (let c of b.children) {
          if (c.id == defaultMethodId) {
            a.defaultMethod = c.defaultMethod = true;
            obj = {a, b, c};
          }
          c.fullName_cn = `${a.name_cn}${c.name_cn}`;
          c.fullName_en = `${a.name_en}.${b.name_en}.${c.name_en}`;
          this.initSetBussiness(c);
          i++;
        }
      }

      ii++;
    }

    return obj;
  }

  mainBussiness(data) {
    this.findCounter(data.name_cn, data);
  }

  findCounter(name, obj) {

    switch (name) {
      case "直选组合":
        this.zhuhe(obj);

        break;
      case "直选和值":
        this.zhixuanhezhi(obj);
        break;

      case "直选跨度":
        this.zhixuankuadu(obj);
        break;
      case "组选和值":
        this.zuxuanhezhi(obj);
        break;

      case "组三":
        this.zusan(obj);
        break;
      case "组六":
        this.zuliu(obj);
        break;
      case "定位胆":
        this.dingweidan(obj);
        break;

      case "包胆":
        this.baodan(obj);
        break;

      case "和值尾数":
        this.commonCount(obj);
        break;
      case "特殊号码":
        this.commonCount(obj);
        break;

      default:

        if ((/大小单双|复式|趣味[\s\S]+?星|区间[\s\S]+?星|万|千|个|百|五星和值/).test(name)) {
          if (/zuxuan\.\w+?fushi/.test(obj.fullName_en)) {
            this.houerfushi(obj);
          } else {
            this.fushi(obj);
          }

        } else if ((/组选(\d+)/).test(name)) {
          this.zuxuanNum(obj, RegExp.$1);
        } else if (/zhixuan\.(\w+)erhezhi/.test(obj.fullName_en)) {
          this.erzhixuanhezhi(obj);
        } else if (/zhixuan\.(\w+)kuadu/.test(obj.fullName_en)) {
          this.houerkuadu(obj);
        } else if (/zuxuan\.(\w+)erhezhi/.test(obj.fullName_en)) {
          this.erzuxuanhezhi(obj);
        } else if (/zuxuan\.(\w+)erbaodan/.test(obj.fullName_en)) {
          this.erbaodan(obj);
        } else if (/(.{1})码不定位/.test(name)) {
          this.budingwei(obj, {'三': 3, '二': 2, '一': 1}[RegExp.$1])
        } else if ((/一帆风顺|好事成双|三星报喜|四季发财|不定位|定单双|猜中位/).test(name)) {
          this.quwei(obj);
        } else if (obj.isdantuo) {
          this.dantuo(obj);
        }
    }
  }

  exclusionArray(a: Array<any>, b: Array<any>) {
    a.forEach((v, k) => {
      if (v) {
        b[k] = false;
      }
    })
  }

  clearArray(arr: Array<any>) {
    arr.forEach((v, k, array) => {
      array[k] = false;
    });
  }

  resetsanmaDantuo(k, arr, obj) {

    let arrgroup = obj.selectarea;
    let arrA = arrgroup[0];
    let arrB = arrgroup[1];

    if (arrA == arr) {
      let choosekey = 0;
      let isChooseAlready = arr.some((v, k) => {
        if (v) choosekey = k;
        return v;
      });

      if (isChooseAlready) {
        this.clearArray(arrA);
        arrA[choosekey] = true;
      }

      arr[k] = !arr[k];
      this.exclusionArray(arrA, arrB);
    } else {
      arr[k] = !arr[k];
      this.exclusionArray(arrB, arrA);
    }

  }

  resetermaDantuo(k, arr, obj) {
    let arrgroup = obj.selectarea;
    let arrA = arrgroup[0];
    let arrB = arrgroup[1];
    if (arrA == arr) {
      arrA.forEach((v, kk, a) => {
        if (k != kk)
          a[kk] = false;
      });
      arr[k] = !arr[k];
      this.exclusionArray(arrA, arrB);
    } else {
      arr[k] = !arr[k];
      this.exclusionArray(arrB, arrA);
    }

  }

  chooseBall(k, arr, obj) {
    if (obj.isbaodan) {
      arr.forEach((v, kk, a) => {
        if (k != kk)
          a[kk] = false;
      });
    } else if (/dantuo/.test(obj.name_en)) {
      switch (obj.name_cn) {
        case '前三组选胆拖':
          this.resetsanmaDantuo(k, arr, obj)
          return;
        case '前二组选胆拖':
          this.resetermaDantuo(k, arr, obj);
          return;
      }
    }
    arr[k] = !arr[k];
  }

  countsTotal(obj) {
    let total = obj.mutipleAndModeObj.mode * obj.price * obj.count * obj.mutipleAndModeObj.times;
    return +total.toFixed(4);
  }

  countChooseLength(arr: Array<Array<any>>): number {
    return arr.map((v) => {
      return v.filter((vv) => {
        return vv;
      }).length;
    }).reduce((prev, cur) => {
      return prev + cur;
    });

  }

  values(minarr): Array<any> {
    return minarr.slice().filter(function (v) {
      return v;
    });
  }

  intersection(array, arraySecond): number {
    return array.filter((v, i) => {
      return v && arraySecond[i];
    }).length;
  }

  zuxuanGenner(obj): Array<any> {
    var plukchoose = obj.selectarea;
    var aArr = plukchoose[0];
    var bArr = plukchoose[1];
    var a = this.values(plukchoose[0]).length;
    var b = this.values(plukchoose[1]).length;
    var r = this.intersection(aArr, bArr);
    return [a, b, r];
  }

  zuxun120_24_2(obj, r): void {
    let a = this.countChooseLength(obj.selectarea);
    obj.count = this.C(a, r);
    obj.totals = this.countsTotal(obj);
  }

  zuxuan60(obj) {

    let ctor = (a, b, r) => {
      return this.C(a, 1) * this.C(b, 3) - r * this.C(b - 1, 2);
    };

    obj.count = ctor.apply(this, this.zuxuanGenner(obj));
    obj.totals = this.countsTotal(obj);
  }

  zuxuan30(obj) {
    let ctor = (a, b, r) => {
      return this.C(a, 2) * this.C(b, 1) - r * this.C(a - 1, 1);
    };

    obj.count = ctor.apply(this, this.zuxuanGenner(obj));
    obj.totals = this.countsTotal(obj);
  }

  zuxuan20(obj) {
    let ctor = (a, b, r) => {
      return this.C(a, 1) * this.C(b, 2) - r * this.C(b - 1, 1);
    };

    obj.count = ctor.apply(this, this.zuxuanGenner(obj));
    obj.totals = this.countsTotal(obj);
  }

  zuxuan10(obj) {
    let ctor = (a, b, r) => {
      return this.C(a, 1) * this.C(b, 1) - r;
    };

    obj.count = ctor.apply(this, this.zuxuanGenner(obj));
    obj.totals = this.countsTotal(obj);
  }

  zuxuan5(obj) {
    let ctor = (a, b, r) => {
      return this.C(a, 1) * this.C(b, 1) - r;
    };

    obj.count = ctor.apply(this, this.zuxuanGenner(obj));
    obj.totals = this.countsTotal(obj);
  }

  zuxuan12(obj) {
    let ctor = (a, b, r) => {
      return this.C(a, 1) * this.C(b, 2) - r * this.C(b - 1, 1);
    };

    obj.count = ctor.apply(this, this.zuxuanGenner(obj));
    obj.totals = this.countsTotal(obj);
  }

  zuxuan4(obj) {
    let ctor = (a, b, r) => {
      return this.C(a, 1) * this.C(b, 1) - r;
    };

    obj.count = ctor.apply(this, this.zuxuanGenner(obj));
    obj.totals = this.countsTotal(obj);
  }


  zuxuanNum(obj, typenum) {
    let r = {120: 5, 24: 4, 6: 2}[typenum];

    if (r) {
      this.zuxun120_24_2(obj, r);
    } else {
      this['zuxuan' + typenum](obj);
    }
  }

  defaultData: any;

  is11Y() {
    return /11Y/.test(this.defaultData.data.game_name_en);
  }

  getl11Yfushi3abcR(arr: Array<Array<any>>): Array<any> {
    let arrA = arr[0];
    let arrB = arr[1];
    let arrC = arr[2];
    let a = this.values(arrA).length;
    let b = this.values(arrB).length;
    let c = this.values(arrC).length;

    let R12 = this.intersection(arrA, arrB);
    let R13 = this.intersection(arrA, arrC);
    let R23 = this.intersection(arrB, arrC);

    let R123 = Math.min(R12, R13, R23,);

    return [a, b, c, R12, R13, R23, R123];
  }

  l11Yfushi3(obj) {
    var ctor = (a, b, c, R12, R13, R23, R123) => {
      return a * b * c - R12 * c - R13 * b - R23 * a + R123 * 2;
    };
    obj.count = ctor.apply(this, this.getl11Yfushi3abcR(obj.selectarea));
    obj.totals = this.countsTotal(obj);

  }

  getl11Yfushi2acr(arr: Array<Array<any>>): Array<any> {
    let arrA = arr[0];
    let arrB = arr[1];
    let a = this.values(arrA).length;
    let b = this.values(arrB).length;
    let r = this.intersection(arrA, arrB);
    return [a, b, r];
  }

  l11Yfushi2(obj) {
    var ctor = (a, b, r) => {
      return a * b - r;
    };
    obj.count = ctor.apply(this, this.getl11Yfushi2acr(obj.selectarea));
    obj.totals = this.countsTotal(obj);
  }

  houerfushi(obj) {
    obj.count = this.C(this.values(obj.selectarea[0]).length, 2);
    obj.totals = this.countsTotal(obj);
  }

  fushi(obj) {
    if (this.is11Y()) {
      if (obj.selectarea.length == 3) {
        this.l11Yfushi3(obj);
      } else if (obj.selectarea.length == 2) {
        this.l11Yfushi2(obj);
      } else {
        let num = {
          "前三组选复式": 3, "前二组选复式": 2
        }[obj.name_cn];
        obj.count = this.C(this.valuesAll(obj.selectarea), num);
        obj.totals = this.countsTotal(obj);
      }
    } else {
      obj.count = this.getCountFromPermutation(obj.selectarea);
      obj.totals = this.countsTotal(obj);
    }
  }

  zhuhe(obj) {
    let plukchoose = obj.selectarea;
    obj.count = plukchoose.length * this.getCountFromPermutation(plukchoose);
    obj.totals = this.countsTotal(obj);
  }

  pluckChooseResult(NumberArray, swichesArray) {
    return NumberArray.filter(function (value, key) {
      return swichesArray[key];
    });
  }

  range(start, position): Array<any> {
    var arr = [];
    for (; start < position; start++) arr.push(start);
    return arr;
  }

  zhixuanhezhi(obj) {
    var ctor = function (n) {
      if (n <= 9) {
        return ((n + 1) * (n + 2)) / 2;
      } else if (n >= 10 && n <= 14) {
        return (((n + 1) * (n + 2) - (3 * (n - 8) * (n - 9)))) / 2;
      } else if (n >= 15 && n <= 17) {
        return {15: 73, 16: 69, 17: 63}[n];
      } else {
        return (29 - n) * (28 - n) / 2;
      }
    };

    var ballArr = obj.selectarea;
    var count = 0;
    var result = this.pluckChooseResult(this.range(0, ballArr[0].length), ballArr[0]);
    for (var i = 0; i < result.length; i++) {
      count += ctor(result[i]);
    }

    obj.count = count;
    obj.totals = this.countsTotal(obj);

  }

  zhixuankuadu(obj) {
    var ctor = function (n) {
      return [10, 54, 96, 126, 144, 150, 144, 126, 96, 54][n];
    };
    var ballArr = obj.selectarea;
    var count = 0;
    var result = this.pluckChooseResult(this.range(0, ballArr[0].length), ballArr[0]);
    for (var i = 0; i < result.length; i++) {
      count += ctor(result[i]);
    }
    obj.count = count;
    obj.totals = this.countsTotal(obj);
  }

  zuxuanhezhi(obj) {
    var ctor = function (n) {
      return {
        "1": 1,
        "2": 2,
        "3": 2,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 8,
        "8": 10,
        "9": 11,
        "10": 13,
        "11": 14,
        "12": 14,
        "13": 15,
        "14": 15,
        "15": 14,
        "16": 14,
        "17": 13,
        "18": 11,
        "19": 10,
        "20": 8,
        "21": 6,
        "22": 5,
        "23": 4,
        "24": 2,
        "25": 2,
        "26": 1
      }[n];
    };

    var ballArr = obj.selectarea;
    var count = 0;

    var result = this.pluckChooseResult(this.range(1, (ballArr[0].length + 1)), ballArr[0]);

    for (var i = 0; i < result.length; i++) {
      count += ctor(result[i]);
    }

    obj.count = count;
    obj.totals = this.countsTotal(obj);

  }

  zusan(obj) {
    var ctor = function (b) {
      return b < 2 ? 0 : this.C(b, 2) * 2;

    };
    var choosearray = obj.selectarea;
    var count = ctor.call(this, this.countChooseLength(choosearray));

    obj.count = count;
    obj.totals = this.countsTotal(obj);

  }

  zuliu(obj) {
    this.zuxun120_24_2(obj, 3);
  }

  valuesAll(arr): number {
    return arr.map((v) => {
      return this.values(v).length;
    }).reduce((prev, cur) => {
      return prev + cur;
    });
  }

  dingweidan(obj) {
    var ballArr = obj.selectarea;
    obj.count = this.valuesAll(ballArr);
    obj.totals = this.countsTotal(obj);
  }

  baodan(obj) {
    let ischoose = obj.selectarea[0].some((v) => {
      return v;
    });
    obj.count = ischoose ? 54 : 0;
    obj.totals = this.countsTotal(obj);

  }

  erbaodan(obj) {
    let ischoose = obj.selectarea[0].some((v) => {
      return v;
    });
    obj.count = ischoose ? 9 : 0;
    obj.totals = this.countsTotal(obj);
  }

  commonCount(obj) {
    obj.count = this.values(obj.selectarea[0]).length;
    obj.totals = this.countsTotal(obj);
  }

  erzhixuanhezhi(obj) {
    var ctor = function (n) {
      return n <= 9 ? n + 1 : 19 - n;
    };
    var ballArr = obj.selectarea;
    var count = 0;
    var result = this.pluckChooseResult(this.range(0, ballArr[0].length), ballArr[0]);
    for (var i = 0; i < result.length; i++) {
      count += ctor(result[i]);
    }

    obj.count = count;
    obj.totals = this.countsTotal(obj);

  }

  erzuxuanhezhi(obj) {
    var ctor = function (n) {
      return n <= 9 ? Math.ceil(n / 2) : Math.ceil((18 - n) / 2);
    };
    var ballArr = obj.selectarea;
    var count = 0;
    var result = this.pluckChooseResult(this.range(1, (ballArr[0].length + 1)), ballArr[0]);
    for (var i = 0; i < result.length; i++) {
      count += ctor(result[i]);
    }

    obj.count = count;
    obj.totals = this.countsTotal(obj);

  }

  houerkuadu(obj) {
    var ctor = function (n) {
      return [10, 18, 16, 14, 12, 10, 8, 6, 4, 2][n];
    };
    var ballArr = obj.selectarea;
    var count = 0;
    var result = this.pluckChooseResult(this.range(0, ballArr[0].length), ballArr[0]);
    for (var i = 0; i < result.length; i++) {
      count += ctor(result[i]);
    }

    obj.count = count;
    obj.totals = this.countsTotal(obj);

  }

  quwei(obj) {
    var ballArr = obj.selectarea;
    obj.count = this.values(ballArr[0]).length;
    obj.totals = this.countsTotal(obj);

  }

  hasBothChooseBall(arr: Array<Array<any>>): boolean {
    return arr.every((v: any[]) => {
      return v.some((v) => {
        return v;
      });
    });
  }

  qiansanzuxuandantuo(obj) {
    //1 => C(n,2), 2 => C(n,1)
    let haschoose = this.hasBothChooseBall(obj.selectarea);
    let arrA = obj.selectarea[0];
    let arrB = obj.selectarea[1];
    let num = {1: 2, 2: 1}[this.values(arrA).length];
    if (haschoose) {
      obj.count = this.values(arrB).length >= num ? this.C(this.values(arrB).length, num) : 0;
      obj.totals = this.countsTotal(obj);
    } else {
      obj.count = 0;
      obj.totals = this.countsTotal(obj);
    }
  }

  qianerzuxuandantuo(obj) {
    //C(n,1)
    let haschoose = this.hasBothChooseBall(obj.selectarea);
    let arrB = obj.selectarea[1];
    if (haschoose) {
      obj.count = this.C(this.values(arrB).length, 1);
      obj.totals = this.countsTotal(obj);
    } else {
      obj.count = 0;
      obj.totals = this.countsTotal(obj);
    }
  }

  dantuo(obj) {
    switch (obj.name_cn) {
      case '前三组选胆拖':
        this.qiansanzuxuandantuo(obj);
        break;
      case '前二组选胆拖':
        this.qianerzuxuandantuo(obj);
        break;
    }

  }

  budingwei(obj: any, r) {

    let a = this.countChooseLength(obj.selectarea);
    obj.count = this.C(a, r);
    obj.totals = this.countsTotal(obj);


  }

  daxiaodanshuangqing(arr, tag, value): Array < any > {
    function hanlder(v, k, arr) {
      arr[k] = false;
    }

    function setDaXiao(startIndex, endindex, array) {
      for (let i = 0; i < array.length; i++) {
        if (i >= startIndex && i < endindex) {
          array[i] = true;
        } else {
          array[i] = false;
        }
      }
    }

    function setDanShuang(tag, array, value) {
      function setFalse(arr, i) {
        arr[i] = false;
      }

      console.log(value);
      function setTrue(arr, i) {
        arr[i] = true;
      }

      function setds(array) {
        for (let i = 0; i < array.length; i++) {
          if (tag == 'dan') {
            if ((+value[i]) % 2 === 0) {
              setFalse(array, i);
            } else {
              setTrue(array, i);
            }
          } else {
            if ((+value[i]) % 2 === 0) {
              setTrue(array, i);
            } else {
              setFalse(array, i);

            }

          }
        }
      }

      setds(array);
    }

    function qing(array) {
      array.some(hanlder);
    }

    function setquan(array) {
      for (let i = 0; i < array.length; i++) arr[i] = true;
    }

    switch (tag) {
      case 'da':
        setDaXiao(arr.length / 2, arr.length, arr);
        break;
      case 'xiao':
        setDaXiao(0, arr.length / 2, arr);
        break;
      case 'dan':
        setDanShuang('dan', arr, value);
        break;
      case 'shuang':
        setDanShuang('shuang', arr, value);
        break;
      case 'quan':
        setquan(arr);
        break;
      case 'qing':
        qing(arr);
        break;
    }

    return arr;
  }

  clearBall(ball: Array < any >) {
    ball.forEach((v) => {
      v.forEach((v, k, arr) => {
        arr[k] = false;
      });
    });
  }

  findRandom(name, obj): void {
    this.clearBall(obj.selectarea);

    switch (name) {
      case"组三":
        this.randomPluck(obj.selectarea[0], 2);
        break;
      case "组六":
        this.randomPluck(obj.selectarea[0], 3);
        break;
      default:
        let zhx = (/组选(\d+)/).exec(name);
        if ((/复式|后二|组合|直选和值|组选和值|定位胆|一帆风顺|好事成双|三星报喜|四季发财|包胆|大小单双|龙/).test(name)) {
          this.runArray(obj.selectarea);
        } else if ((/(.{1})码不定位/).test(name)) {
          this.randomPluck(obj.selectarea[0], {
            '三': 3,
            '二': 2,
            '一': 1
          }[RegExp.$1]);
        } else if (zhx) {
          let num = zhx[1];
          let b = obj.selectarea;
          if (b.length == 1) {
            this.randomPluck(b[0], {120: 5, 60: 4, 24: 4, 6: 2}[num])
          } else {
            let marr = {60: [1, 4], 30: [2, 1], 20: [1, 2], 10: [1, 1], 12: [1, 2], 4: [1, 2]}[num];
            this.randomPluck(b[0], marr[0]);
            this.randomPluck(b[1], marr[1]);
          }
        }
    }
  }


  randomPluck(array, num): void {
    let cacheIndex = [];

    function randomNum() {
      let n = Math.floor(Math.random() * array.length);
      if (cacheIndex.indexOf(n) > -1) n = randomNum();
      cacheIndex.push(n);
      return n;
    }

    if (!num) {
      let index = Math.floor(Math.random() * array.length);
      array[index] = true;

    } else {
      for (let i = 0; i < num; i++) array[randomNum()] = true;
    }
    return array;
  }

  runArray(ball) {
    function hanlder(v, k, arr) {
      arr[k] = false;
    }

    for (let key = 0; key < ball.length; key++) {
      if (ball[key] instanceof Array) {
        ball[key].some(hanlder);
        this.randomPluck(ball[key], null);
      }
    }
  }

  deepCloneObj(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  encrypt(data: string): string {
    var _$ = ['\x4a\x38\x4c\x46\x51\x49\x55\x37\x58\x38\x59\x54\x46\x42\x52\x39', '\x45\x33\x54\x59\x34\x37\x30\x50\x48\x47\x54\x45\x56\x35\x59\x42'];
    var key = CryptoJS.enc.Latin1.parse(_$[0]);
    var iv = CryptoJS.enc.Latin1.parse(_$[1]);
    return CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).toString();
  }
}
