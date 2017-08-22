/**
 * Created by richard.g on 14/08/2017.
 */

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors');

app.use(cors());

/**
 * 1。登陆页
 */
let error = {
  Msg: "用户名或者密码错误",
  isSuccess: 0,
  type: 'error'
};
app.post('/mobile-h5-auth/login', ({body}, res) => {
  if (body.username && body.password) {
    res.json(require('./data/login.json'));
  } else {
    res.json(error);
  }
});

/**
 * 1。*****************首页数据，开始******************
 */
let _token = 'uk9ZswIRWYIdKWmx93k3apeplMuDBH4Y2KuvkLlV';
app.get('/mobileh5-announcements/banner', ({body}, res) => {
  res.json(require('./data/index/get/banner.json'));
});

app.get('/mobileh5-users/user-account-info', ({body}, res) => {
  res.json(require('./data/index/get/user-account-info.json'));
});

app.get('/mobileh5-announcements', ({body}, res) => {
  res.json(require('./data/index/get/mobileh5-announcements.json'));
});

let errortoken = {
  Msg: "token",
  isSuccess: 0,
  type: 'token'
};

app.post('/mobile-lotteries-h5/lottery-info', ({body}, res) => {
  if (body._token == _token) {
    res.json(require('./data/index/post/lottery-info.json'));
  } else {
    res.json(errortoken);
  }
});

app.get('/mobileh5-users/user-account-info', ({body}, res) => {
  res.json(require('./data/index/get/user-account-info.json'));
});

/**
 * 投注记录接口
 * 请求参数

 {
 "_token": "uk9ZswIRWYIdKWmx93k3apeplMuDBH4Y2KuvkLlV",
 "page": 1,
 "end": "",
 "start": "",
 "bet_status": 1,
 "lottery_id": ""
}
 */

app.post('/mobileh5-projects', ({body}, res) => {
  if (body._token == _token) {
    res.json(require('./data/index/post/game-record.json'));
  } else {
    res.json(errortoken);
  }
});

/**
 * 帐变记录接口
 */

app.post('/mobileh5-reports/0/getmobileusertransaction/', ({body}, res) => {
  if (body._token == _token) {
    res.json(require('./data/index/post/charge-record.json'));
  } else {
    res.json(errortoken);
  }
});

/**
 * 站内信接口
 */

app.post('/mobileh5-station-letters/', ({body}, res) => {
  if (body._token == _token) {
    res.json(require('./data/index/post/messgae.json'));
  } else {
    res.json(errortoken);
  }
});

/**
 * 站内信详情接口
 */

app.get('/mobileh5-station-letters/:id/view', ({body}, res) => {
  res.json(require('./data/index/get/messgae-detail.json'));
});

/**
 * 投注详情接口
 */

app.get('/mobileh5-projects/:id/view', ({body}, res) => {
  res.json(require('./data/index/get/bet-detail.json'));
});

/**
 * 优惠接口
 */
app.get('/mobileh5-announcements/youhui', ({body}, res) => {
  res.json({"isSuccess": 1, "type": "info", "data": {"youhui": [{name:'Specil',detail:{name:'Special Detail',content:'abcdefghijklmnopqrstuvwxyz'},pic_url:'assets/img/favorable-banner.jpg'}], "tplData": []}});
});

/**
 * 提款接口,
 * 无参数
 */

app.get('/mobileh5-withdrawals/withdraw', ({body}, res) => {
    res.json(require('./data/withdraw.json'));
});

/**
 * 用户信息
 *无参数
 */

app.get('/mobileh5-users/user-account-info', ({body}, res) => {
    res.json({"isSuccess":1,"type":"info","data":{"available":"37.9","tplData":[]}});
});

/**
 * 支付方式接口
 */

app.post('/mobile-lotteries-h5/load-data/banks_tab/availabe', ({body}, res) => {
  if (body._token == _token) {
    res.json(require('./data/index/post/check-pay.json'));
  } else {
    res.json(errortoken);
  }
});


app.listen(8181);

console.log('************listening************* port 8181');

