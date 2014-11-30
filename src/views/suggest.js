var Backbone = require('backbone');

function getCities(characters) {
    return $.ajax('http://ekb.shri14.ru/api/suggest?query=' + characters)
        .success(function (data) {});
}

var Suggest = Backbone.View.extend({
    initialize: function(options) {
        this.state = options.state;
        this.render();
    },

    events: {
        'keyup input':  'update',
        'click button': 'selectCity'
    },

    update: function(e) {

        $('input').autocomplete({
            source: function( request, response ) {
                $.ajax('http://ekb.shri14.ru/api/suggest?query=' + request.term)
                    .success(function (data) {
                        var cities = data.map(function(el) {
                            return el.name;
                        });
                        response (cities);
                    });
            }
        });



        /*var query = $.trim(e.target.value);

        var citiesReq = getCities(query).then(function(data) {
            var cities        = data,
                citiesArr     = [],
                mincharacters = 1;

            if (cities.length > 0) {
                cities.forEach(function(el) {
                    citiesArr.push(el.name);
                });
            }

            if(citiesArr.length > 20) {
                mincharacters = 3;
            }

            $( "input" ).autocomplete({
                source: citiesArr,
                minLength: mincharacters
            });
        });*/



        /*var cities = getCities($.trim(e.target.value)).success(function (data) {

        });*/
        /*cities = [];

        $.ajax({
            url: "http://ekb.shri14.ru/api/suggest",
            dataType: "json",
            data: {
                query: $.trim(e.target.value)
            },
            success: function( data ) {
                cities = data;
            }
        });

        console.log(cities);*/

        //var q = $.trim(e.target.value);
    },

    selectCity: function(e) {
        var query = $.trim($('input').val());

        var citiesReq = getCities(query).then(function(data) {
            if (data.length === 1) {
                console.log(data);
            }
        });
    },

    render: function() {
        //$('input').val('');
    }
});

module.exports = Suggest;
