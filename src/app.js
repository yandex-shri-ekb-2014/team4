var Router = require('./router');

var initialize = function () {
    new Router();
}

if (window) {
    window.onload = initialize;
} else {
    initialize();
}
