var geolocator = function () {
    var deferred = $.Deferred();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            $.ajax('http://ekb.shri14.ru/api/geocode?coords=' + [
                    pos.coords.longitude,
                    pos.coords.latitude
                ].join(','))
                .error(deferred.reject)
                .success(deferred.resolve);
        });
    } else {
        deferred.reject('unsupported');
    }

    return deferred.promise();
}

module.exports = geolocator;
