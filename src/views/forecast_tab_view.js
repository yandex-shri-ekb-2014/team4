var $            = require('jquery'),
    Backbone     = require('backbone');
var tabsTemplate = require('../templates/tabs.hbs');

var tabs = [
    {
        title: 'кратко',
        link: 'forecast_short',
    },
    {
        title: 'подробно',
        link: 'forecast_full'
    },
    {
        title: 'наглядно',
        link: 'forecast_hours',
    }
];

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
        var tabsLength = tabs.length - 1;

        if (tabsLength >= 0) {
            tabs.forEach(function(element, index) {
                if (index === 0) {
                    element.class = 'tabs__tab_left';
                } else if (index === tabsLength) {
                    element.class = 'tabs__tab_right';
                } else {
                    element.class = 'tabs__tab_middle';
                }

                this.$el.append(this.template(element));
            }, this);
        }

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
