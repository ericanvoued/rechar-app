class GameUtil {
  constructor() {
  }

  C(n, r) {
    if (r > n) return 0;
    if (r === undefined) throw Error("请传入每个参数");
    /*---数学公式=n!/r!(n-r)!----*/
    return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
  }

  factorial(num) {
    var total = 1;
    for (var i = 1; i <= num; i++) {
      total *= i;
    }
    return total;
  }
}

var g = new GameUtil();

console.log(g.C(5,3));



