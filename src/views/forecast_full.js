var TabPaneView = require('./tab_pane');
var forecastFullTemplate = require('../templates/forecast_full.hbs');
var forecastFullDayTemplate = require('../templates/forecast_full_day.hbs');

var ForecastFullView = TabPaneView.extend({

    tabName: 'full',

    initialize: function (options) {
        this.initializeTabs(options.state);
        this.collection.on('reset', this.render, this);
    },

    render: function() {
        var daysHtml = [];

        this.collection.forEach(function (model) {
            daysHtml.push(forecastFullDayTemplate(model.toJSON()));
        });

        this.$el.html(forecastFullTemplate({
            days: daysHtml
        }));
    }
});

module.exports = ForecastFullView;
