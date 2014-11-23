var $        = require('jquery'),
    Backbone = require('backbone');

var ForecastTabView = Backbone.View.extend({
    el: '.tabs',
    events: {
        'click .tabs__tab': 'switch'
    },
    switch: function(el) {
        var $allTabs = this.$el.find('.tabs__tab');

        $allTabs.each(function(){
            if ($(this).hasClass('button-active')) {
                $(this).removeClass('button-active');
            }
        });

        $(el.currentTarget).addClass('button-active');
    }
});

module.exports = ForecastTabView;
