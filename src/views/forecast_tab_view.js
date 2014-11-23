var $            = require('jquery'),
    Backbone     = require('backbone');
var tabsTemplate = require('../templates/tabs.hbs');

var tabs = [
    {
        title: 'кратко',
        link: 'forecast_short'
    },
    {
        title: 'подробно',
        link: 'forecast_full'
    },
    {
        title: 'наглядно',
        link: 'forecast_hours'
    }
];

var tabsLength = tabs.length - 1;

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
        tabs.forEach(function(element, index) {
            this.$el.html(this.template(element));
            //console.log('a[' + index + '] = ' + element.title + element.link);
        }, this);


        //this.$el.html(this.template(tabs));
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
});;

module.exports = ForecastTabView;
