var $ = require('jquery'),
Backbone = require('backbone'),
nowTemplate = require('../templates/now.hbs');

NowView = Backbone.View.extend({
    initialize: function(options) {
        this.today = options.today;
        this.yesterday = options.yesterday;
        this.render();
    },
    render: function() {
        console.log(this.today);
        console.log(this.yesterday);
        this.$el.html(nowTemplate({today:this.today, yesterday: this.yesterday}));
    }
});

module.exports = NowView;
