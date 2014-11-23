var Backbone = require('backbone');
var $ = require('jquery');
var Router = require('./router');
var StateModel = require('./models/state');
var fetchHelper = require('./utils/fetch_helper');
var ForecastShortView = require('./views/forecast_short');

Backbone.$ = $;

var initialize = function () {
    var state = new StateModel();


    new Router({state: state});

    fetchHelper(state.get('locality')).then(function (data) {
        new ForecastShortView({
            el: $('.forecast_short'),
            collection: data.forecast
        });
    });

    Backbone.history.start();
}

if (window) {
    window.onload = initialize;
} else {
    initialize();
}
