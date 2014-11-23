var Handlebars = require('hbsfy/runtime');
var datef = require('datef');

Handlebars.registerHelper('weatherIcon', function (icon) {
    return 'http://ekb.shri14.ru/icons/' + icon + '.svg';
});

Handlebars.registerHelper('moonIcon', function (moonCode) {
    return 'http://ekb.shri14.ru/icons/icon_moon_' + moonCode + '.svg';
});

Handlebars.registerHelper('datef', function (format, date) {
    return datef(format, date);
});
