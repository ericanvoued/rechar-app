import {Injectable} from '@angular/core';
import {BusinessTool} from "../../../providers/tools/business-tool";

@Injectable()
export class SubBusinessToolProvider extends BusinessTool {
  constructor() {
    super();

  }

  renderData: any = {};

  SetRenderData(c) {
    this.renderData[c.fullName_en.replace(/\./g, '')] = c;
  }

  initSetBussiness(c) {
    this.SetRenderData(c);
    console.log(this.renderData);

    c.modesArray = [1, 0.1, 0.01];
    let mutipleAndModeObj = {
      mode: 1,
      times: 1
    };

    c.mutipleAndModeObj = mutipleAndModeObj;

    c.count = 0;
    c.totals = 0;
    //是否和值
    this._.observe(c.selectarea, 'update', () => {
      this.mainBussiness(c);
    });

    this._.observe(c.mutipleAndModeObj, 'update', () => {
      this.mainBussiness(c);
    });

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
