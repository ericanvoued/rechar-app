import {Injectable} from '@angular/core';

@Injectable()
export class PK10 {
  data = [[1, 2, 3, 4, 6], [1, 2, 3, 5, 9], [1, 2, 4, 7], [1, 3, 5, 7, 8]];

  constructor() {}

  countPK10(data) {
    if (data.constructor == String) {
      return this.countStrPK10(data);
    } else if (data.constructor == Array) {
      return this.countArrPK10(data);
    }
  }

  countStrPK10(data) {
    let total = 0;
    if (data.trim() == '') return total;
    let flag = data.trim().split(/[,;.?!@#$%^*_\-+=|\/\\~&()\[\]{}]+/);
    let basic = flag[0].trim().split(/\s+/).length;
    for(let i=0;i<flag.length;i++){
      let sub= flag[i].trim().split(/\s+/);
      if(sub.length==basic && this.checkSingle(sub)) total++;
    }
    return total;
  }

  checkSingle(data){
    for(let i=0;i<data.length;i++){
      for(let j=i+1;j<data.length;j++){
        if(data[j]==data[i]) return false;
      }
    }
    return true;
  }

  countArrPK10(data) {
    let total = 0;
    let start = 0;
    let flag = [];
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
}



