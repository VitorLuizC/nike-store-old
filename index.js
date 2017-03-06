const path = require('path');
const process = require('process');
const express = require('express');

const config = {
  port: process.env.PORT || 9001,
  host: process.env.IP || '127.0.0.1',
  callback() {
    console.log(`
      App was started!
      App is listening at http://localhost:${config.port}/
    `);
  }
};

const app = express();

app.use(express.static('./dist'));
app.listen(config.port, config.callback);
