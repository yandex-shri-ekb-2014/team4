var Backbone = require('backbone');
var Router = require('./router');
var StateModel = require('./models/state');

Backbone.$ = require('jquery');

var initialize = function () {
    var state = new StateModel();

    new Router({state: state});

    Backbone.history.start();
}

if (window) {
    window.onload = initialize;
} else {
    initialize();
}
