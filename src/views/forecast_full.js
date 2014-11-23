var Backbone = require('backbone');
var forecastFullTemplate = require('../templates/forecast_full.hbs');
var forecastFullDayTemplate = require('../templates/forecast_full_day.hbs');

var ForecastFullView = Backbone.View.extend({
    initialize: function () {
        this.render();
    },

    render: function() {
        var daysHtml = [];

        this.collection.forEach(function (model) {
            console.log(model.toJSON().date.toString());
            daysHtml.push(forecastFullDayTemplate(model.toJSON()));
        });

        this.$el.html(forecastFullTemplate({
            days: daysHtml
        }));
    }
});

module.exports = ForecastFullView;
