const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const router = require('./router');
app.use((req, res, next) => {
  console.log('path:', req.path);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
app.use('/', router);
app.listen(8089, () => {
  console.log('API is running at 3200');
});
