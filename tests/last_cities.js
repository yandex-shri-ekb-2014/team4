casper.test.begin('last city', 3, function(test) {

    var cityName;

    casper.start('http://localhost:8080/54/short', function() {
        this.waitForSelector('.city-select__city-name');
    });

    casper.then(function() {
        cityName = this.getElementInfo('.city-select__city-name').html;
        this.mouseEvent('click', '.city-select__city-other.button');
    });

    casper.then(function() {
        test.assert(this.visible('.city-select__city-dropdown'));
    });

    casper.then(function() {
        test.assert(this.getElementInfo('.city-select__city-dropdown').html.length !== 0);
    });

    casper.then(function() {
        if (!this.exists('.city-select__recent-list-link_active')) {
            this.echo('element doesn\'t exist');
            test.assert(false);
        } else {
            test.assert(this.getElementInfo('.city-select__recent-list-link_active').html == cityName);
        }
    });

    casper.run(function() {
        test.done();
    });

})
