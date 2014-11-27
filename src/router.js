var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    state: null,

    routes: {
        ':geoid/:tab': 'index',
    },

    initialize: function (options) {
        this.state = options.state;
    },

    index: function (geoid, tab) {
        console.log(geoid);
        this.state.set({
            geoid: geoid,
            tab: tab
        });
    }
});

module.exports = Router;
