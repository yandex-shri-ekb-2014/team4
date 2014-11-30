casper.test.begin('check if tab click changes URL', 3, function(test) {

    casper.start('http://localhost:8080/54/full', function() {
        this.waitForSelector('.tabs');
    });

    casper.then(function() {
        this.waitForSelector('.tabs>a[data-tab="short"]');
    });

    casper.then(function() {
        this.mouseEvent('click', '.tabs>a[data-tab="short"]');
    });

    casper.then(function() {
        test.assert(this.getCurrentUrl().indexOf('/short') >= 0);
    });

    casper.then(function() {
        this.waitForSelector('.tabs>a[data-tab="hours"]');
    });

    casper.then(function() {
        this.mouseEvent('click', '.tabs>a[data-tab="hours"]');
    });

    casper.then(function() {
        test.assert(this.getCurrentUrl().indexOf('/hours') >= 0);
    });

    casper.then(function() {
        this.waitForSelector('.tabs>a[data-tab="full"]');
    });

    casper.then(function() {
        this.mouseEvent('click', '.tabs>a[data-tab="full"]');
    });

    casper.then(function() {
        test.assert(this.getCurrentUrl().indexOf('/full') >= 0);
    });

    casper.run(function() {
        test.done();
    });

})
