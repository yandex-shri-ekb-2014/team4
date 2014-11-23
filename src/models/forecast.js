var Backbone = require('backbone');

var ForecastModel = Backbone.Model.extend({
    constructor: function() {
        Backbone.Model.apply(this, arguments);
        var selfDate = new Date(Date.parse(this.get('date')));
        this.set({
            dateObject: selfDate,
            isWeekend: [0,6].indexOf(selfDate.getDay()) >= 0,
            dayOfWeek: ['вс','пн','вт','ср','чт','пт','сб'][selfDate.getDay()]
        });
    }
});

module.exports = ForecastModel;
