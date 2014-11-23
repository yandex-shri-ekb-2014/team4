var Backbone = require('backbone');
var ForecastModel = require('../models/forecast');

var ForecastCollection = Backbone.Collection.extend({
    model: ForecastModel
});

module.exports = ForecastCollection;
