var Backbone = require('backbone');
var $ = require('jquery');
var Router = require('./router');
var StateModel = require('./models/state');
var fetchHelper = require('./utils/fetch_helper');
var ForecastShortView = require('./views/forecast_short');
var ForecastTabView = require('./views/forecast_tab_view');

Backbone.$ = $;

var initialize = function () {
    var state = new StateModel();


    new Router({state: state});
    new ForecastTabView();

    fetchHelper(state.get('locality')).then(function (data) {
        new ForecastShortView({
            el: $('.forecast__short'),
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
