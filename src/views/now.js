var Backbone = require('backbone');
var nowTemplate = require('../templates/now.hbs');

NowView = Backbone.View.extend({
    initialize: function(options) {
        this.forecast = options.collection;
        this.render();
    },
    render: function() {
        var current_day = this.forecast.models[0].get('parts').slice(0,4),
        next_day = this.forecast.models[1].get('parts').slice(0,4),
        sunrise = this.forecast.models[0].get('sunrise'),
        sunset = this.forecast.models[0].get('sunset'),
        hour = new Date().getHours();

        if (hour >= 0 && hour <= 5){
            current_day_part = 3; // ночь
        } else if(hour >= 6 && hour <= 11) {
            current_day_part = 0; // утро
        } else if(hour >= 12 && hour <= 17){
            current_day_part = 1; // день
        } else if(hour >= 18 && hour <= 23){
            current_day_part = 2; // вечер
        }

        var part_map = {'morning':0, 'day':1, 'evening':2, 'night':3},
        parts_today = current_day.slice(current_day_part),
        parts_next_day =  next_day.slice(0,4-parts_today.length),
        parts_for_now_block = parts_today.concat(parts_next_day);

        parts_for_now_block[0].sunset = this.forecast.models[0].get('sunset');
        parts_for_now_block[0].sunrise = this.forecast.models[0].get('sunrise');

        this.$el.html(nowTemplate({parts: parts_for_now_block}));
    }
});

module.exports = NowView;
