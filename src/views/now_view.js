var $ = require('jquery'),
Backbone = require('backbone'),
nowTemplate = require('../templates/now.hbs');
NowView = Backbone.View.extend({
    el: $(".current-weather"),

    initialize: function() {
        //console.log(nowTemplate({}));
    },

    template: function() {
        return 'this now template'
    },

    render: function() {
        console.log(this.template);
    }
});

module.exports = NowView;
