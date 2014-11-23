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
                shortParts.unshift(selfParts[i]);
            } else {
                regularParts.unshift(selfParts[i]);
            }
        };
        this.set({
            date: selfDate,
            is_weekend: [0,6].indexOf(selfDate.getDay()) >= 0,
            parts: regularParts,
            parts_short: shortParts
        });
    }
});

module.exports = ForecastModel;
