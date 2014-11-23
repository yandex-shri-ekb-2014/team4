var $ = require('jquery');
var FactModel = require('../models/fact');
var ForecastCollection = require('../collections/forecast');

var fetch = function (locality) {
    var deferred = $.Deferred();

    $.ajax('http://ekb.shri14.ru/api/localities/' + locality)
        .error(deferred.reject)
        .success(function (data) {
            deferred.resolve({
                today: new FactModel(data.fact),
                yesterday: new FactModel(data.yesterday),
                forecast: new ForecastCollection(data.forecast),
            });
        });

    return deferred.promise();
}

module.exports = fetch;
