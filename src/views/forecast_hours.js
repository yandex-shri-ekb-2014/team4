var Backbone = require('backbone'),
    d3       = require('d3-browserify');
var forecastHoursTemplate = require('../templates/forecast_hours.hbs');

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}

function getPxArrOfTempArr(tempArr, height, divisionMargin) {
    var pxArr     = [],
        minTemp   = getMinOfArray(tempArr),
        maxTemp   = getMaxOfArray(tempArr),
        countTemp = maxTemp - minTemp,
        division  = height / (countTemp + divisionMargin);

    tempArr.forEach(function (temp) {
        pxArr.push((temp - minTemp + divisionMargin) * division);
    });

    return pxArr;
}


var ForecastHoursView = Backbone.View.extend({

    tabName: 'hours',

    initialize: function (options) {
        options.state.on('change:tab', this.tabChanged, this);
        this.tabChanged(options.state);
        this.render();
    },

    tabChanged: function (state) {
        if (this.tabName === state.get('tab')) {
            this.$el.show();
        } else {
            this.$el.hide();
        }
    },

    render: function() {
        var nowDate   = new Date().getDate(),
            tempArr   = [];

        this.collection.forEach(function (model) {
            if (nowDate === model.get('date').getDate()) {
                var hourses = model.get('hours');

                hourses.forEach(function(hours) {
                    tempArr.push(hours.temp);
                });
            }
        });

        var margin = {top: 10, right: 30, bottom: 30, left: 20},
            width = 1400 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        var tempPxArr = getPxArrOfTempArr(tempArr, height, 2);

        console.log(tempPxArr);

        this.$el.html(forecastHoursTemplate());




        /*

        // преобразование числа в подобие времени
        var formatHours = function(d) { return d+':00'; };

        var x = d3.scale.linear()
            .domain([0, 24])
            .range([0, width]);

        var xAxis = d3.svg.axis()
            .scale(x) // масштаб оси
            .ticks(24) // количество делений
            .orient("bottom")
            .tickFormat(formatHours);

        var svg = d3.select(".forecast_hours_svg") // выбираем наш svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g") // добавляем к svg группу
            .attr("class", "x axis") // определяем класс
            .attr("transform", "translate(0," + height + ")") // передвинуть ось Х вниз, на высоту поля
            .call(xAxis); // вызываем функцию*/



        //Width and height
        var barPadding = 1;

        //Create SVG element
        var svg = d3.select(".forecast_hours_svg")
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("rect")
            .data(tempPxArr)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return i * (width / tempPxArr.length);
            })
            .attr("y", function(d) {
                return height - d;
            })
            .attr("width", width / tempPxArr.length - barPadding)
            .attr("height", function(d) {
                return d * 4;
            });

        svg.selectAll("text")
            .data(tempPxArr)
            .enter()
            .append("text")
            .text(function(d, i) {
                tempArr.forEach(function (temp, e) {
                    //return temp;
                    if (e === i) {
                        d = temp;
                    }
                });
                return d;

            })
            .attr("text-anchor", "middle")
            .attr("x", function(d, i) {
                return i * (width / tempPxArr.length) + (width / tempPxArr.length - barPadding) / 2;
            })
            .attr("y", function(d) {
                return height - d + 14;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");


        // Generate a log-normal distribution with a median of 30 minutes.
        /*var values = d3.range(1000).map(d3.random.logNormal(Math.log(30), .4));

        // Formatters for counts and times (converting numbers to Dates).
        var formatCount = d3.format(",.0f"),
            formatTime = d3.time.format("%H:%M"),
            formatMinutes = function(d) { return formatTime(new Date(2012, 0, 1, d)); };



        var margin = {top: 10, right: 30, bottom: 30, left: 30},
            width = 1400 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .domain([0, 24])
            .range([0, width]);

        // Generate a histogram using twenty uniformly-spaced bins.
        var data = d3.layout.histogram()
            .bins(x.ticks(24)) // количество столбцов
            (values);

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.y;  })]) // высота в px
            .range([height, 0]);

        //
        var xAxis = d3.svg.axis()
            .scale(x)
            .ticks(20)
            .orient("bottom")
            .tickFormat(formatMinutes);

        //
        var svg = d3.select(".forecast_hours_svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        bar.append("rect")
            .attr("x", 1) // зазор между прямоугольниками
            .attr("width", x(data[0].dx) - 1) // -1 учёт зазора, x(0)
            .attr("height", function(d) { return height - y(d.y); });

        /*bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", x(data[0].dx) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.y); });*/

        /*
        //
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        */

        /*
        var margin = {top: 200, right: 10, bottom: 200, left: 10},
            width = 960 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .domain([0, 24])
            .range([0, width]);

        var y = d3.scale.linear()
            .range([0, height]);

        var svg = d3.select(".forecast_hours_svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("rect")
            .attr("class", "grid-background")
            .attr("width", width)
            .attr("height", height);

        svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.svg.axis().scale(x).ticks(20).tickSize(-height))
            .selectAll(".tick")
            .data(x.ticks(10), function(d) { return d; })
            .exit()
            .classed("minor", true);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.svg.axis().scale(x).ticks(24));*/
        /*var margin = {top: 250, right: 40, bottom: 250, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.time.scale()
            .domain([new Date(2012, 0, 1), new Date(2013, 0, 1)])
            .range([0, width]);

        var xAxis = d3.svg.axis()
            .scale(x);

        var svg = d3.select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");*/

        /*// генерируем 10 случайных величин
        // массив из 1000 чисел от 0 до 999
        var values = d3.range(1000).map(d3.random.bates(24));

        var formatCount = d3.format(",.0f");

        var margin = {top: 10, right: 30, bottom: 30, left: 30},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .domain([0, 1])
            .range([0, width]);


        // Generate a histogram using twenty uniformly-spaced bins.
        var data = d3.layout.histogram()
            .bins(x.ticks(20))
        (values);

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.y; })])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var svg = d3.select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        // рисуем столбцы
        bar.append("rect")
            .attr("x", 1)
            .attr("width", x(data[0].dx) - 1)
            .attr("height", function(d) { return height - y(d.y); });

        // подпист на столбах
        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", x(data[0].dx) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.y); });

        // нижняя строка
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);*/
    }
});

module.exports = ForecastHoursView;
