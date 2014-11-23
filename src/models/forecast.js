var Backbone = require('backbone');

var ForecastModel = Backbone.Model.extend({
    constructor: function() {
        Backbone.Model.apply(this, arguments);
        var selfDate = new Date(this.get('date'));
        this.set({
            date: selfDate,
            is_weekend: [0,6].indexOf(selfDate.getDay()) >= 0,
            day_of_week: ['вс','пн','вт','ср','чт','пт','сб'][selfDate.getDay()]
        });
    }
});

module.exports = ForecastModel;
