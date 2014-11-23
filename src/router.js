var $ = require('jquery');
var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
    },

    index: function () {
        console.log("Hello world!");
    }
});

module.exports = Router;
