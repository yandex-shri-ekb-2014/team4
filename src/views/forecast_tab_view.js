var $            = require('jquery'),
    Backbone     = require('backbone');
var tabsTemplate = require('../templates/tabs.hbs');

var ForecastTabView = Backbone.View.extend({
    template: tabsTemplate,
    el: '.tabs',
    events: {
        //'click .tabs__tab': 'switch'
    },
    initialize: function() {
        this.render();
    },
    render: function(){
        this.$el.html(this.template({title: 'test', url: 'url'}));
    },
    /*switch: function(el) {
        var $allTabs = this.$el.find('.tabs__tab');

        $allTabs.each(function(){
            if ($(this).hasClass('button-active')) {
                $(this).removeClass('button-active');
            }
        });

        $(el.currentTarget).addClass('button-active');
    }*/
});

module.exports = ForecastTabView;
