var Backbone = require('backbone'),
    forecastShortTemplate = require('../templates/forecast_short.hbs');

var ForecastShortView = Backbone.View.extend({

    initialize: function () {

        console.log("here is short view", this.collection);
        this.render();
    },

    render: function() {
        console.log("short render");
        this.$el.html(forecastShortTemplate({forecast: this.collection}));
    }
});

module.exports = ForecastShortView;
