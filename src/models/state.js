var Backbone = require('backbone');

var StateModel = Backbone.Model.extend({
    defaults: {
        tab: 'short',
        geoid: 54,
        locality: null,
        recent: [
            {
              'geoid': 54,
              'name': 'Екатеринбург',
              'provinceId': 11162,
              'countryId': 225
            }
        ]
    }
});

module.exports = StateModel;
