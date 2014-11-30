var Backbone = require('backbone');

var TabPaneView = Backbone.View.extend({
    initializeTabs: function (state) {
        state.on('change:tab', this.tabChanged, this);
        this.tabChanged(state);
    },

    tabChanged: function (state) {
        if (this.tabName === state.get('tab')) {
            this.$el.show();
        } else {
            this.$el.hide();
        }
    }
});

module.exports = TabPaneView;
