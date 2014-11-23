var $ = require('jquery');
var Backbone = require('backbone');
var now_view = require('./views/now_view.js')

Backbone.$ = $;

var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
    },

    index: function () {
        console.log("Hello world!");
    },
});

new Router();
Backbone.history.start();

module.exports = Router;
