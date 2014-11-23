var $        = require('jquery');
var Backbone = require('backbone');
var Router = require('./router');
var ForecastTabView = require('./views/forecast_tab_view');

Backbone.$ = $;

var initialize = function () {
    new Router();
    new ForecastTabView();
}

if (window) {
    window.onload = initialize;
} else {
    initialize();
}
