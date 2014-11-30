var Backbone = require('backbone');
var Router = require('./router');
var StateModel = require('./models/state');
var fetchHelper = require('./utils/fetch_helper');
var CitySelectView = require('./views/city_select');
var ForecastTabsView = require('./views/forecast_tabs');
var ForecastShortView = require('./views/forecast_short');
var ForecastFullView = require('./views/forecast_full');
var ForecastHoursView = require('./views/forecast_hours');
var NowView = require('./views/now');

require('./utils/template_helper');

var initialize = function () {
    Backbone.$ = $;

    var state = new StateModel();

    state.on('change:geoid', function () {

        fetchHelper(state.get('geoid')).then(function (data) {
            state.set('locality', data.locality);

            new CitySelectView({
                el: $('.city-select'),
                model: state
            });

            new ForecastShortView({
                el: $('.forecast_short'),
                collection: data.forecast,
                state: state,
            });

            new ForecastFullView({
                el: $('.forecast_full'),
                collection: data.forecast,
                state: state,
            });

            new ForecastHoursView({
                el: $('.forecast_hours'),
                collection: data.forecast,
                state: state,
            });

            new NowView({
                el: $('.current-weather'),
                test: data,
                today: data.today,
                yesterday: data.yesterday,
                state: state,
                collection: data.forecast
            });
        });
    });

    new Router({state: state});
    new ForecastTabsView({
        el: $('.tabs'),
        state: state
    });

    Backbone.history.start({pushState: true});
}

if (window) {
    window.onload = initialize;
} else {
    initialize();
}
