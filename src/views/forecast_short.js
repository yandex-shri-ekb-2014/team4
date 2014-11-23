var Backbone = require('backbone');

var ForecastShortView = Backbone.View.extend({
    initialize: function () {
        console.log("here is short view");
    },
    render: function() {
        console.log('render method');
    }
});

module.exports = ForecastShortView;
