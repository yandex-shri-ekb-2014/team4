var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app
  .use('/assets', express.static(__dirname + '/../assets'))
  .use(function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  })
  .listen(port, function () {
    console.log("Server listening on port " + port);
  });
