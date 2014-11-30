var fetch = function (geoid) {
    var deferred = $.Deferred();

    $.ajax('http://ekb.shri14.ru/api/localities/' + geoid)
        .error(deferred.reject)
        .success(function (data) {
            deferred.resolve({
                locality: data.info,
                today: data.fact,
                yesterday: data.yesterday,
                forecast: data.forecast
            });
        });

    return deferred.promise();
}

module.exports = fetch;
