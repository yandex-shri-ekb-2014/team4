var $ = require('jquery'),
Backbone = require('backbone'),
nowTemplate = require('../templates/now.hbs');

NowView = Backbone.View.extend({
    el: $(".current-weather"),

    initialize: function() {
        this.render();
    },

    template: function() {
        return 'this now template'
    },

    render: function() {
        console.log(nowTemplate());
        this.el.html(nowTemplate());
    }
});

module.exports = NowView;
