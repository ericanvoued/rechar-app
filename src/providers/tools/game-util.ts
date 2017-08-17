import {Injectable} from '@angular/core';

@Injectable()

export class GameUtil {
  constructor() {
  }

  C(n, r): number {
    if (r > n) return 0;
    if (r === undefined) throw Error("请传入每个参数");
    /*---数学公式=n!/r!(n-r)!----*/
    return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
  }

  factorial(num): number {
    var total = 1;
    for (var i = 1; i <= num; i++) {
      total *= i;
    }
    return total;
  }

  getTrueArrayLength(arr): number {
    return arr.filter((v) => {
      return v;
    }).length;
  }

  getCountFromPermutation(arg: Array<any>): number {
    return arg.reduce((prev, cur) => {
      return prev * this.getTrueArrayLength(cur);
    }, 1);
  }

  getCountFromCombination(arr, r): number {
    var n = this.getTrueArrayLength(arr);
    return this.C(n, r);
  }

}
