var Backbone = require('backbone'),
    forecastShortTemplate = require('../templates/forecast_short.hbs');

var ForecastShortView = Backbone.View.extend({

    initialize: function () {

        console.log(this.collection);
        this.render();
    },

    render: function() {
        var output = '',
            modelDate,
            tomorrow = new Date().getDate() + 1;
        this.collection.each(function(mod) {
            modelDate = mod.get('date').getDate();
            if (modelDate < tomorrow) {
                return;
            }
            mod.set('isTomorrow', modelDate === tomorrow);
            output += forecastShortTemplate({model: mod.toJSON()});
        });
        this.$el.html(output);
    }
});

module.exports = ForecastShortView;
