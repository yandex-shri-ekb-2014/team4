var path = require('path');
var express = require('express');
var app = express();

app
  .use('/assets', express.static(__dirname + '/../assets'))
  .use(function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  })
  .listen(process.env.PORT, function () {
    console.log("Server listening on port " + process.env.PORT);
  });
