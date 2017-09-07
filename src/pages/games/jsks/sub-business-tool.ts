import {Injectable} from '@angular/core';
import {BusinessTool} from "../../../providers/tools/business-tool";
import {Config} from "../../../config/config";

@Injectable()
export class SubBusinessToolProvider extends BusinessTool {
  constructor() {
    super();

  }

  initSetBussiness(c) {
    debugger
    let bet_numberArrObj = [];
    let selectarea = [];
    let selectareaPair = [];

    for (let key in c.bet_number) {
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

    this._.observe(c.selectarea, 'update', () => {
      this.mainBussiness(c);
    });

    this._.observe(c.mutipleAndMode, 'update', () => {
      this.mainBussiness(c);
    });

  }
}
