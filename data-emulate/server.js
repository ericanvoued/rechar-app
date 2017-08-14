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


app.listen(8181);

console.log('************listening************* port 8181');

