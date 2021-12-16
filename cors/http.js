const express = require('express')
const app = express()

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  next()
});

app.all('/index', (req, res) => {
  res.send('ok')
})

app.listen(3001, () => {
  console.log('server is listening on port 3001!');
})