casper.test.begin('id-title consistency', 3, function(test) {

    casper.start('http://localhost:8080/54/short', function() {
        this.waitForSelector('.city-select__city-name');
    });

    casper.then(function() {
        test.assert(this.getElementInfo('.city-select__city-name').html.indexOf('Екатеринбург') >= 0);
    });

    casper.then(function() {
        casper.open('http://localhost:8080/213/short');
    });

    casper.then(function() {
        test.assert(this.getElementInfo('.city-select__city-name').html.indexOf('Москва') >= 0);
    });

    casper.then(function() {
        casper.open('http://localhost:8080/2/short');
    });

    casper.then(function() {
        test.assert(this.getElementInfo('.city-select__city-name').html.indexOf('Санкт-Петербург') >= 0);
    });

    casper.run(function() {
        test.done();
    });

})
