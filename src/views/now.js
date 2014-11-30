var $ = require('jquery'),
Backbone = require('backbone'),
nowTemplate = require('../templates/now.hbs');

NowView = Backbone.View.extend({
    initialize: function(options) {
        this.today = options.today;
        this.yesterday = options.yesterday;
        this.forecast = options.collection;
        this.render();
    },
    render: function() {
        console.log('Forecast current day',this.forecast.models[0].get('parts').slice(0,4));
        console.log('Forecast next day',this.forecast.models[1].get('parts').slice(0,4));

        var current_day = this.forecast.models[0].get('parts').slice(0,4),
        next_day = this.forecast.models[1].get('parts').slice(0,4),
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
        //number_last_part_today = part_map[parts_today[parts_today.length - 1].type],
        parts_next_day =  next_day.slice(0,4-parts_today.length),
        parts_for_now_block = parts_today.concat(parts_next_day);

        console.log('parts_today',parts_today);
        console.log('parts next day', parts_next_day);
        console.log('now_block', parts_for_now_block);
        this.$el.html(nowTemplate({parts: parts_for_now_block}));
    }
});

module.exports = NowView;
