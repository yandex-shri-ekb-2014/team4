var Backbone = require('backbone'),
    forecastFullDayTemplate = require('../templates/forecast_full_day.hbs');

var ForecastFullView = Backbone.View.extend({
    initialize: function () {
        this.render();
    },

    render: function() {

        var html = '';

        this.collection.forEach(function (model) {
            html += forecastFullDayTemplate({
                model: model,
            });
        })

        this.$el.html(html);
    }
});

module.exports = ForecastFullView;
