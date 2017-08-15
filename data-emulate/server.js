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


app.listen(8181);

console.log('************listening************* port 8181');

