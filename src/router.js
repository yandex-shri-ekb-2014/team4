var Backbone = require('backbone');
var geolocator = require('./utils/geolocator');

var Router = Backbone.Router.extend({
    state: null,

    routes: {
        '': 'autoDetect',
        ':geoid': 'index',
        ':geoid/:tab': 'index'
    },

    initialize: function (options) {
        this.state = options.state;
        this.state.on('change', function (state) {
            var geoid = state.get('geoid'),
                tab = state.get('tab');
            if (geoid !== undefined && tab !== undefined) {
                Backbone.history.navigate(
                    geoid + '/' + tab,
                    { trigger: true }
                );
            }
        });
    },

    autoDetect: function () {
        var self = this;

        geolocator()
            .then(function (data) {
                self.state.set('geoid', data.geoid);
            });
    },

    index: function (geoid, tab) {
        this.state.set({
            geoid: geoid,
            tab: tab || 'short'
        });
    }
});

module.exports = Router;
