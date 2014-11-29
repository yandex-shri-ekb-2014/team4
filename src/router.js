var Backbone = require('backbone');
var geolocator = require('./utils/geolocator');

var Router = Backbone.Router.extend({
    state: null,

    routes: {
        '': 'autoDetect',
        ':geoid/:tab': 'index',
    },

    initialize: function (options) {
        this.state = options.state;
    },

    autoDetect: function () {
        var self = this;

        geolocator()
            .then(function (data) {
                self.state.set({geoid: data.geoid});
            });
    },

    index: function (geoid, tab) {
        this.state.set({
            geoid: geoid,
            tab: tab
        });
    }
});

module.exports = Router;
