casper.test.begin('now block existence', 2, function(test) {

    casper.start('http://localhost:8080/54/short');

    casper.then(function() {
        this.waitForSelector('.current-weather');
    });

    casper.then(function() {
        test.assert(this.exists('.current-weather_columns-wrapper'));
    });

    casper.then(function() {
        test.assert(this.getElementInfo('.current-weather_columns-wrapper').html.length !== 0);
    });

    casper.run(function() {
        test.done();
    });

})
