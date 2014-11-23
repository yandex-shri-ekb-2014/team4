var Backbone = require('backbone');

var StateModel = Backbone.Model.extend({
    defaults: {
        tab: 'short',
        locality: 10,
    }
});

module.exports = StateModel;
