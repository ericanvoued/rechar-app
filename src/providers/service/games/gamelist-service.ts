import {Injectable} from '@angular/core';
import {HttpClientProvider} from "../../http-client/http-client";
import {GlobalShareProvider} from "../../global-share/global-share";


@Injectable()
export class Gamelist {
  nowData = [{
    "haschildren": true,
    "children": [{"name": "重庆时时彩", "pid": 1, "nav": "CQSSC", "time": "2017/06/05 10:29:30"}, {
      "name": "黑龙江时时彩",
      "pid": 3,
      "nav": "HLJSSC",
      "time": "2017/06/05 10:38:00"
    }, {"name": "江西时时彩", "pid": 5, "nav": "JXSSC", "time": null}, {
      "name": "新疆时时彩",
      "pid": 6,
      "nav": "XJSSC",
      "time": "2017/06/05 10:37:00"
    }, {"name": "天津时时彩", "pid": 7, "nav": "TJSSC", "time": "2017/06/05 10:36:00"}, {
      "name": "博猫2分彩",
      "pid": 11,
      "nav": "BMSSC",
      "time": "2017/06/05 10:30:00"
    }, {"name": "博猫1分彩", "pid": 23, "nav": "BM1MSSC", "time": "2017/06/05 10:29:00"}, {
      "name": "博猫5分彩",
      "pid": 24,
      "nav": "BM5MSSC",
      "time": "2017/06/05 10:30:00"
    }, {"name": "夺金60秒", "pid": 72, "nav": "TJ60", "time": "2017/06/05 10:29:00"}],
    "name": "时时彩系列"
  }, {
    "haschildren": true,
    "children": [{"name": "山东11选5", "pid": 2, "nav": "SD11Y", "time": "2017/06/05 10:33:30"}, {
      "name": "江西11选5",
      "pid": 8,
      "nav": "JX11Y",
      "time": "2017/06/05 10:38:00"
    }, {"name": "广东11选5", "pid": 9, "nav": "GD11Y", "time": "2017/06/05 10:29:00"}, {
      "name": "博猫11选5",
      "pid": 12,
      "nav": "BM11Y",
      "time": "2017/06/05 10:30:00"
    }],
    "name": "11选5系列"
  }, {"haschildren": false, "children": [], "name": "六合彩系列"}, {
    "haschildren": false,
    "children": [],
    "name": "幸运28系列"
  }, {"haschildren": false, "children": [], "name": "快三系列"}];
  lottoryList = [];
  storeKey = "gamelist";
  recordlist: any = [];

  groupData(data): any {
    for (let key in data) {
      if (data[key].time)
        data[key].time = data[key].time.replace(/-/g, '/');
    }


    let obj = data;

    let list = Object.keys(obj).map((k) => obj[k]);
    let listFitered = [];

    listFitered.unshift({
      haschildren: true, children: list.filter((v, key) => {
        if (/K3/.test(v.nav)) {
          delete list[key];
          return v;
        }
      }), name: "快三系列"
    });

    listFitered.unshift({
      haschildren: true, children: list.filter((v, key) => {
        if (/KL/.test(v.nav)) {
          delete list[key];
          return v;
        }
      }), name: "幸运28系列"
    });
    listFitered.unshift({
      haschildren: true, children: list.filter((v, key) => {
        if (/LHC/.test(v.nav)) {
          delete list[key];
          return v;
        }
      }), name: "六合彩系列"
    });

    listFitered.unshift({
      haschildren: true, children: list.filter((v, key) => {
        if (/11Y/.test(v.nav)) {
          delete list[key];
          return v;
        }
      }), name: "11选5系列"
    });


    listFitered.unshift({
      haschildren: true, children: list.filter((v, key) => {
        if (/SSC|60/.test(v.nav)) {
          delete list[key];
          return v;
        }
      }), name: "时时彩系列"
    });

    list.forEach((v, key) => {
      !v.name && delete list[key];
    });

    let result = listFitered.concat(Object.keys(list).map((k) => list[k]));

    result.forEach((v) => {
      let children = v.children;

      return v.haschildren = children && !!v.children.length;
    });

    this.nowData = result;
    return result;
  }

  constructor(public http: HttpClientProvider, private share: GlobalShareProvider) {

  }


  getRecord() {
    this.getGameRecord('/mobileh5-projects');
  }

  async getGameRecord(url: string) {
    let list = await this.http.post(url, {_token: this.share.user.token});
    if (list.data) {
      this.recordlist = list.data.data || [];
    }
  }
}
