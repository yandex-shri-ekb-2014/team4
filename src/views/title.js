var Backbone = require('backbone');

var TitleView = Backbone.View.extend({
    initialize: function () {
        this.model.on('change:locality', this.render, this);
    },

    render: function () {
        this.$el.html('Погода в ' + this.model.get('locality').nameprep);
    }
});

module.exports = TitleView;
