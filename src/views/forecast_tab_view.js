var $            = require('jquery'),
    Backbone     = require('backbone');
var tabsTemplate = require('../templates/tabs.hbs');

var tabs = [
    {
        title: 'кратко',
        link: 'short'
    },
    {
        title: 'подробно',
        link: 'full'
    },
    {
        title: 'наглядно',
        link: 'hours'
    }
];

var ForecastTabView = Backbone.View.extend({
    template: tabsTemplate,
    el: '.tabs',
    initialize: function(options) {
        this.state = options.state;
        this.state.on('change', this.render, this);
        this.render();
    },
    render: function(){
        var tabsLength = tabs.length - 1;

        if (tabsLength >= 0) {
            tabs.forEach(function(element) {
                if(this.state.get('tab') === element.link) {
                    element.class += ' button-active';
                }
            }, this);
        }
        this.$el.append(this.template(tabs));
    }
});

module.exports = ForecastTabView;
