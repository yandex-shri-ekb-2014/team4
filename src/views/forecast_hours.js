var Backbone = require('backbone');
var forecastHoursTemplate = require('../templates/forecast_hours.hbs');

var ForecastHoursView = Backbone.View.extend({

    tabName: 'hours',

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
        console.log("HERE");
        this.$el.html(forecastHoursTemplate());
    }
});

module.exports = ForecastHoursView;
