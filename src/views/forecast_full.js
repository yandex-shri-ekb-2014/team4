var Backbone = require('backbone');
var forecastFullTemplate = require('../templates/forecast_full.hbs');
var forecastFullDayTemplate = require('../templates/forecast_full_day.hbs');

var ForecastFullView = Backbone.View.extend({

    tabName: 'full',

    initialize: function (options) {
        options.state.on('change:tab', this.tabChanged, this);
        this.tabChanged(options.state);
        this.render();
    },

    tabChanged: function (state) {
        if (this.tabName === state.get('tab')) {
            this.$el.show();
        } else {
            this.$el.hide();
        }
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
