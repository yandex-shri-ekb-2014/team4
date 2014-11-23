var Backbone = require('backbone');

var ForecastModel = Backbone.Model.extend({
    constructor: function() {
        Backbone.Model.apply(this, arguments);
        var selfDate = new Date(this.get('date')),
            regularParts = [],
            shortParts = [],
            selfParts = this.get('parts');
        for (var i = selfParts.length;i--;) {
            if (['day_short','night_short'].indexOf(selfParts[i].type) >= 0) {
                shortParts.push(selfParts[i]);
            } else {
                regularParts.push(selfParts[i]);
            }
        };
        this.set({
            date: selfDate,
            is_weekend: [0,6].indexOf(selfDate.getDay()) >= 0,
            day_of_week: ['вс','пн','вт','ср','чт','пт','сб'][selfDate.getDay()],
            parts: regularParts,
            parts_short: shortParts
        });
    }
});

module.exports = ForecastModel;
