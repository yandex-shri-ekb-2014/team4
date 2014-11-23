var Backbone = require('backbone'),
    forecastShortTemplate = require('../templates/forecast_short.hbs');

var ForecastShortView = Backbone.View.extend({
    template: forecastShortTemplate,
    initialize: function () {
        console.log("here is short view");
        this.render();
    },
    render: function() {
        console.log("short render");
        console.log(this.template());
    }
});

module.exports = ForecastShortView;
