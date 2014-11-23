var Backbone = require('backbone');
var $ = require('jquery');
var Router = require('./router');
var StateModel = require('./models/state');
var fetchHelper = require('./utils/fetch_helper');
var ForecastShortView = require('./views/forecast_short');
var ForecastFullView = require('./views/forecast_full');

Backbone.$ = $;

var initialize = function () {
    var state = new StateModel();

    new Router({state: state});

    fetchHelper(state.get('locality')).then(function (data) {
        new ForecastShortView({
            el: $('.forecast__short'),
            collection: data.forecast
        });

        new ForecastFullView({
            el: $('.forecast_full'),
            collection: data.forecast
        });
    });

    Backbone.history.start();

if (window) {
    window.onload = initialize;
} else {
    initialize();
}
