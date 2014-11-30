var TabPaneView = require('./tab_pane');
var forecastHoursTemplate = require('../templates/forecast_hours.hbs');
var d3 = require('d3-browserify');
var temp2color = require('../utils/temp2color');
var dateUtils = require('../utils/dateutils');

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
        division  = Math.round(height / (countTemp + divisionMargin));

    tempArr.forEach(function (temp) {
        pxArr.push((temp - minTemp + divisionMargin) * division);
    });

    return pxArr;
}

var ForecastHoursView = TabPaneView.extend({

    tabName: 'hours',

    initialize: function (options) {
        this.initializeTabs(options.state);
        this.collection.on('reset', this.render, this);
    },

    render: function() {
        var date          = new Date(),
            nowDate       = date.getDate(),
            nowHour       = date.getHours();
            tempArr       = [],
            tomorrowDate  = dateUtils.getTomorrow().getDate();

        this.collection.forEach(function (model) {
            var modelDate = model.get('date').getDate(),
                isTomorrow = tomorrowDate === modelDate,
                isToday = nowDate === modelDate;

            if (isToday || isTomorrow) {
                var hours = model.get('hours');

                hours.forEach(function(hourData) {
                    var hour = parseInt(hourData.hour);
                    if ((isToday && hour >= nowHour) || (isTomorrow && hour < nowHour)) {
                        tempArr.push(hourData.temp);
                    }
                });
            }
        });

        var margin = {
                top:    20,
                right:  30,
                bottom: 30,
                left:   20
            },
            width = 960 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        var tempPxArr = getPxArrOfTempArr(tempArr, height, 2);

        this.$el.html(forecastHoursTemplate());

        // преобразование числа в подобие времени
        var formatHours = function(d) {
            d = d + nowHour;

            if (d > 23) {
                d -= 24;
            }

            return d + ':00';
        };

        var x = d3.scale.linear()
            .domain([0, tempArr.length])
            .range([0, width]);

        var data = d3.layout.histogram()
            .bins(x.ticks(tempArr.length))
            (tempPxArr);

        var xAxis = d3.svg.axis()
            .scale(x)
            .ticks(tempArr.length)
            .orient('bottom')
            .tickFormat(formatHours);

        var svg = d3.select('.forecast_hours__svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var bar = svg.selectAll('forecast_hours__svg_bar')
            .data(data)
            .enter().append('g')
            .attr('class', 'forecast_hours__svg_bar')
            .attr('transform', function(d, i) {
                    return 'translate(' + x(d.x) + ', '+ (height - tempPxArr[i]) +')';
            });

        bar.append('rect')
            .attr('x', 0)
            .attr('fill', function(d,i) {
                return '#' + temp2color(tempArr[i]);
            })
            .attr('width', x(data[0].dx) - 1)
            .data(tempPxArr)
            .attr('height', function(d) {
                return d;
            });

        bar.append('text')
            .attr('dy', '-10px')
            .attr('y', 5)
            .attr('x', x(data[0].dx) / 2)
            .attr('text-anchor', 'middle')
            .text(function(d,i) {
                var tempNow = tempArr[i],
                    sign    = '';

                if (tempNow > 0) {
                    sign = '+';
                }

                return sign + tempNow;
            });

        svg.append('g')
            .attr('class', 'x forecast_hours__svg_axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);
    }
});

module.exports = ForecastHoursView;
