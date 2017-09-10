import {Injectable} from '@angular/core';
import {BusinessTool} from "../../../providers/tools/business-tool";

@Injectable()
export class SubBusinessToolProvider extends BusinessTool {
  constructor() {
    super();

  }

  initSetBussiness(c) {
    console.log(c);
    let bet_numberArrObj = [];
    let selectarea = [];
    let selectareaPair = [];

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

    this._.observe(c.selectarea, 'update', () => {
      this.mainBussiness(c);
    });

    this._.observe(c.mutipleAndModeObj, 'update', () => {
      this.mainBussiness(c);
    });

  }
}
