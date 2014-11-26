var Backbone = require('backbone');
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
    events: {
        'click a': 'transition'
    },
    transition: function(e) {
        e.preventDefault();
        var href = $(e.currentTarget).attr('href')
        Backbone.history.navigate(href, { trigger: true });
    },
    render: function(){
        if (tabs.length > 0) {
            this.$el.html(this.template({
                tabs: tabs,
                state: this.state.toJSON()
            }));
        }
    }
});

module.exports = ForecastTabView;
