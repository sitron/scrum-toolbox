YUI.add('SprintChart', function(Y) {
    Y.namespace('SmbSprintChart');

    var chart, shownSeries, axes, seriesCollection, chartStyle, topLine, chartData, chartDataAll, sprintData;

    chartData = [];

    // decide what serie to show
    shownSeries = ['MD', 'BV', 'SP'];

    // define axes
    axes = {
        md: {
            keys: ['MD'],
            position: 'left',
            type: 'numeric',
            minimum: 0,
            maximum: 9,
            labelFormat: {'decimalPlaces': 1}
        },
        bv: {
            keys: ['BV'],
            position: 'right',
            type: 'numeric',
            minimum: 0,
            maximum: 50,
            labelFormat: {'decimalPlaces': 0}
        },
        sp: {
            keys: ['SP'],
            position: 'right',
            type: 'numeric',
            minimum: 0,
            maximum: 20,
            labelFormat: {'decimalPlaces': 0}
        },
        dates: {
            keys: ['date'],
            position: 'bottom',
            type: 'category',
//            type:"time",
//            labelFormat: "%a %b %d",
//            minimum: '11/06/2011',
//            maximum: '11/20/2011',
            styles: {
                majorTicks: {
                    display: 'none'
                },
                label: {
                    rotation: -45,
                    margin: {top: 5}
                }
            }
        }
    };

    // defines series (graphs)
    seriesCollection = [
         {
            type: 'combo',
            xAxis: 'dates',
            yAxis: 'md',
            xKey: 'date',
            yKey: 'MD',
            xDisplayName: 'Date',
            yDisplayName: 'Man/Days',
            line: {
               'color': '#000'
            },
            marker: {
                'border': {
                    'color': '#000'
                },
                'fill': {
                    'color': '#fff'
                }
            }
        },
        {
            type: 'combo',
            xAxis: 'dates',
            yAxis: 'bv',
            xKey: 'date',
            yKey: 'BV',
            xDisplayName: 'Date',
            yDisplayName: 'Business Value',
            line: {
               'color': '#F64227'
            },
            marker: {
                'border': {
                    'color': '#F64227'
                },
                'fill': {
                    'color': '#fff'
                }
            }
        },
        {
            type: 'combo',
            xAxis: 'dates',
            yAxis: 'sp',
            xKey: 'date',
            yKey: 'SP',
            xDisplayName: 'Date',
            yDisplayName: 'Story Points',
            line: {
               'color': '#26BCD6'
            },
            marker: {
                'border': {
                    'color': '#26BCD6'
                },
                'fill': {
                    'color': '#fff'
                }
            }
        }
    ];

    chartStyle = {
       background: {
          fill : {
             color : getBackgroundColor()
          },
          border : {
             color : "#9aa",
             weight : 1
          }
       }
    };

    function getBackgroundColor() {
        var c = Y.one('#graph-canvas').getStyle('backgroundColor');
        return c;
    };

    // on ajax call complete
    function complete(id, o, args) {
        var result = Y.JSON.parse(o.responseText).sprint;
        drawChart(result);
    };

    Y.SmbSprintChart.createChart = function(sprint) {
        if (typeof sprint === 'string') {
            sprint = sprint.replace(/&quot;/ig,'"');
            sprint = Y.JSON.parse(sprint);
        };
        drawChart(sprint);
    }

    function drawChart(sprint) {
        var biggestRatio, chartDataExtended;

        // Transform data for chart
        sprintData = sprint;
        defineDataProvider(sprint);
        biggestRatio = getBiggestRatio(sprint);
        updateAxes(sprint, biggestRatio);

        // Velocity
        updateVelocity(sprint);

        // Burnt
        updateBurnt(sprint);

        // Title
        updateTitleIndex(sprint.index);

        // Show at least 10 dates or use end date
        chartDataExtended = fillDates();

        // Instantiate and render the chart
        Y.one('#graph-canvas').setContent('');
        chart = new Y.Chart({
            dataProvider: chartDataExtended,
            render: '#graph-canvas',
            categoryKey: 'date',
            seriesKeys: shownSeries,
            axes: axes,
            horizontalGridlines: true,
            verticalGridlines: true,
            seriesCollection: seriesCollection,
            styles: {graph: chartStyle}
        });

        drawTopLine(biggestRatio);
    };

    function drawTopLine(biggestRatio) {
        var topline, chartwidth, chartheight, topmargin;

        topLine = new Y.Graphic({render:"#graph-canvas"});
        chartwidth = Y.one('#graph-canvas').getComputedStyle('width');
        chartheight = parseInt(Y.one('#graph-canvas').getComputedStyle('height')) - 65;
        topline = topLine.addShape({
            type: "path",
            stroke: {
                weight: 1,
                color: "#000",
                opacity: 1,
                dashstyle: [3, 4]
            }
        });
        topmargin = Math.round(biggestRatio > 1 ? chartheight - (chartheight / biggestRatio) : 0);
        topline.moveTo(30, topmargin);
        topline.lineTo(parseInt(chartwidth) - 50, topmargin);
        topline.end();
    };

    function updateTitleIndex(index) {
        Y.one('#sprint-index').setContent(index);
    };

    function updateVelocity(sprint) {
        var planned, last, actual;

        planned = Math.round(sprint.nbSP / sprint.nbMD * 10) / 10;
        last = chartData[chartData.length - 1];
        actual = Math.round(last.SP / last.MD * 10) / 10;
        actual = isNaN(actual) ? 0 : actual;

        Y.one('.sprint-velocity-planned').setContent(planned);
        Y.one('.sprint-velocity-actual').setContent(actual);
    };

    function updateBurnt(sprint) {
        var last = chartData[chartData.length - 1];
        Y.one('.sprint-burnt-md').setContent(Math.round(last.MD * 10) / 10);
        Y.one('.sprint-burnt-sp').setContent(Math.round(last.SP * 10) / 10);
        Y.one('.sprint-burnt-bv').setContent(Math.round(last.BV * 10) / 10);
        Y.one('.sprint-burnt-md-ratio').setContent(Math.round((last.MD / sprint.nbMD) * 100) + '%');
        Y.one('.sprint-burnt-sp-ratio').setContent(Math.round((last.SP / sprint.nbSP) * 100) + '%');
        Y.one('.sprint-burnt-bv-ratio').setContent(Math.round((last.BV / sprint.nbBV) * 100) + '%');
    };

    // update axes max values
    function updateAxes(result, biggestRatio) {
        axes.md.maximum = biggestRatio > 1 ? biggestRatio * (result.nbMD) : result.nbMD;
        axes.bv.maximum = biggestRatio > 1 ? biggestRatio * (result.nbBV) : result.nbBV;
        axes.sp.maximum = biggestRatio > 1 ? biggestRatio * (result.nbSP) : result.nbSP;
    };

    function getBiggestRatio(result) {
        var last, biggestRatio;

        last = chartData[chartData.length - 1];
        biggestRatio = Math.max(Math.max((last.MD/result.nbMD), (last.SP/result.nbSP)), (last.BV/result.nbBV));
        return biggestRatio;
    };

    // update data with ajax call result
    function defineDataProvider(result) {
        chartData = [{'date': '', 'MD': 0, 'BV': 0, 'SP': 0}];
        chartDataAll = [{'date': '', 'MD': 0, 'BV': 0, 'SP': 0}];

        var cSP = 0;
        var cBV = 0;
        var cMD = 0;

        Y.each(result.days, function(day) {
            cSP += day.nbSP;
            cBV += day.nbBV;
            cMD += day.nbHours;
            if (day.createdBy !== 'machine') {
                chartData.push({'date': day.date, 'MD': cMD / 8, 'BV': cBV, 'SP': cSP});
                chartDataAll.push({'date': day.date, 'MD': cMD / 8, 'BV': cBV, 'SP': cSP});
            } else {
                chartDataAll.push({'date': day.date, 'MD': '', 'BV': '', 'SP': ''});
            }
        });
    };

    // if end date is specified take it into account, else show at least 10 dates
    var fillDates = function() {
        var dates = [];

        if (sprintData.endDate) {
            dates = chartDataAll;
        } else {
            dates = chartData;
            while (dates.length < 10) {
                dates.push({'date': '', 'MD': '', 'BV': '', 'SP': ''});
            }
        }
        return dates;
    }

    Y.on('io:complete', complete, this, []);

    Y.SmbSprintChart.loadSprint = function(sprintId) {
        Y.io(Routing.generate('smbox_stats_sprint_data', { sprint: sprintId }));
        return chart;
    };

    Y.SmbSprintChart.updateSize = function(w, h) {
        chart.set('width', w);
        chart.set('height', h);
    }

}, '0.1', {requires: ['charts', 'io-base', 'json-parse', 'node', 'graphics']});

