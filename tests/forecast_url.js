casper.test.begin('forecast URL consistency', 9, function(test) {

    casper.start('http://localhost:8080/54/short', function() {
        this.waitForSelector('.forecast_short');
    });

    casper.then(function() {
        test.assert(this.visible('.forecast_short'));
    });

    casper.then(function() {
        if (this.exists('.forecast_full')) {
            test.assert(!this.visible('.forecast_full'));
        }
        if (this.exists('.forecast_hours')) {
            test.assert(!this.visible('.forecast_hours'));
        }
    });

    casper.then(function() {
        casper.open('http://localhost:8080/54/full');
    });

    casper.then(function() {
        this.waitForSelector('.forecast_full');
    });

    casper.then(function() {
        test.assert(this.visible('.forecast_full'));
    });

    casper.then(function() {
        if (this.exists('.forecast_short')) {
            test.assert(!this.visible('.forecast_short'));
        }
        if (this.exists('.forecast_hours')) {
            test.assert(!this.visible('.forecast_hours'));
        }
    });

    casper.then(function() {
        casper.open('http://localhost:8080/54/hours');
    });

    casper.then(function() {
        this.waitForSelector('.forecast_hours');
    });

    casper.then(function() {
        test.assert(this.visible('.forecast_hours'));
    });

    casper.then(function() {
        if (this.exists('.forecast_short')) {
            test.assert(!this.visible('.forecast_short'));
        }
        if (this.exists('.forecast_full')) {
            test.assert(!this.visible('.forecast_full'));
        }
    });

    casper.run(function() {
        test.done();
    });

})
