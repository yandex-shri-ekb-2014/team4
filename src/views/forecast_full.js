var Backbone = require('backbone'),
    forecastFullTemplate = require('../templates/forecast_full.hbs');

var ForecastFullView = Backbone.View.extend({
    initialize: function () {
        this.render();
    },

    render: function() {
        this.$el.html(forecastFullTemplate({
            forecast: this.collection
        }));
    }
});

module.exports = ForecastFullView;
