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
        self = this;

        $('input').autocomplete({
            source: function( request, response ) {
                $.ajax('http://ekb.shri14.ru/api/suggest?query=' + request.term)
                    .success(function (data) {
                        var cities = data.map(function(el) {
                            return el.name;
                        });
                        response (cities);
                    });
            },
            select: function(event, ui){
                self.selectCity(ui.item.value);
            }
        });

        if (e.key === 'Enter') {
            this.selectCity();
        }
    },

    selectCity: function(query) {
        query = typeof(query) === 'string' ? query : $.trim($('input').val());

        var state = this.state;

        getCities(query).then(function(data) {
            if (data.length === 1) {
                var geoId = data.map(function(el) {
                    return el.geoid;
                });

                state.set('geoid', geoId[0]);
            }
        });
    },

    render: function() {
        $('input').val('');
    }
});

module.exports = Suggest;
