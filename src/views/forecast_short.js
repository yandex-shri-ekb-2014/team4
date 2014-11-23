var Backbone = require('backbone'),
    forecastShortTemplate = require('../templates/forecast_short.hbs');

var ForecastShortView = Backbone.View.extend({

    initialize: function () {

        console.log(this.collection);
        this.render();
    },

    render: function() {
        this.$el.html(forecastShortTemplate({forecast: this.collection}));
    }
});

module.exports = ForecastShortView;
