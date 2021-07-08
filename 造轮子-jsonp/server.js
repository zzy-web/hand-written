var express = require('express')
var app = express()
app.listen(8088, () => {
  console.log('端口启动成功！')
})
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 当发出GET请求时，返回“hello world”
app.get('/jsonp', function (req, res) {
  res.send("jsonp(11)")
})
app.get('/get', function (req, res) {
  console.log(112)
  res.send({ a: 11 })
})