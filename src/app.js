var $ = require('jquery');
var Backbone = require('backbone');
var Router = require('./router');
var NowView = require('./views/now_view');

var initialize = function () {
    new Router();

    new NowView();
}

if (window) {
    window.onload = initialize;
} else {
    initialize();
}
