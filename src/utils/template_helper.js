var Handlebars = require('hbsfy/runtime');
var datef = require('datef');
var temp2color = require('../utils/temp2color');

require('datef/lang/ru');
datef.lang('ru');

Handlebars.registerHelper('weatherIcon', function (icon) {
    return 'http://ekb.shri14.ru/icons/' + icon + '.svg';
});

Handlebars.registerHelper('moonIcon', function (moonCode) {
    return 'http://ekb.shri14.ru/icons/icon_moon_' + moonCode + '.svg';
});

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }

    return options.inverse(this);
});

Handlebars.registerHelper('datef', function (format, date) {
    return datef(format, date);
});

Handlebars.registerHelper('temp2color', temp2color);

var translates = {
    morning: 'утром',
    day: 'днем',
    evening: 'вечером',
    night: 'ночью',
};

Handlebars.registerHelper('t', function(key) {
    if (translates.hasOwnProperty(key)) {
        return translates[key];
    }

    return key;
});
