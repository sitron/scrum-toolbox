YUI.add('SprintChart', function(Y) {
    Y.namespace('SmbSprintChart');

    var chart, chartValues, shownSeries, axes, seriesCollection;

    chartValues = [];

    // decide what serie to show
    shownSeries = ['MD', 'BV', 'SP'];

    // define axes
    axes = {
        md: {
            keys: ['MD'],
            position: 'left',
            type: 'numeric',
            minimum: 0,
            maximum: 9
        },
        bv: {
            keys: ['BV'],
            position: 'right',
            type: 'numeric',
            minimum: 0,
            maximum: 50
        },
        sp: {
            keys: ['SP'],
            position: 'right',
            type: 'numeric',
            minimum: 0,
            maximum: 20
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
            yDisplayName: 'Man/Days'
        },
        {
            type: 'combo',
            xAxis: 'dates',
            yAxis: 'bv',
            xKey: 'date',
            yKey: 'BV',
            xDisplayName: 'Date',
            yDisplayName: 'Business Value'
        },
        {
            type: 'combo',
            xAxis: 'dates',
            yAxis: 'sp',
            xKey: 'date',
            yKey: 'SP',
            xDisplayName: 'Date',
            yDisplayName: 'Story Points'
        }
    ];

    // on ajax call complete
    function complete(id, o, args) {
        var result = Y.JSON.parse(o.responseText).sprint;

        // Transform data for chart
        chartValues = defineDataProvider(result);
        updateAxes(result);

        // Velocity
        updateVelocity(result);

        // Instantiate and render the chart
        chart = new Y.Chart({
            dataProvider: fillDates(chartValues),
            render: '#graph-canvas',
            categoryKey: 'date',
            seriesKeys: shownSeries,
            axes: axes,
            horizontalGridlines: true,
            verticalGridlines: true,
            seriesCollection: seriesCollection
        });
    };

    function updateVelocity(sprint) {
        var planed = Math.round(sprint.nbSP / sprint.nbMD * 10) / 10;
        var last = chartValues[chartValues.length - 1];
        var actual = Math.round(last.SP / last.MD * 10) / 10;
        Y.one('.sprint-velocity-planed').setContent(planed);
        Y.one('.sprint-velocity-actual').setContent(actual);
    };

    // update axes max values
    function updateAxes(result) {
        axes.bv.maximum = result.nbBV;
        axes.sp.maximum = result.nbSP;
    };

    // update data with ajax call result
    function defineDataProvider(result) {
        var data = [{'date': '', 'MD': 0, 'BV': 0, 'SP': 0}];
        var cSP = 0;
        var cBV = 0;
        var cMD = 0;
        Y.each(result.days, function(day) {
            cSP += day.nbSP;
            cBV += day.nbBV;
            cMD += day.nbHours;
            data.push({'date': day.date, 'MD': cMD / 8, 'BV': cBV, 'SP': cSP});
        });
        return data;
    };

    // show at least 10 dates
    var fillDates = function(dates) {
        while (dates.length < 10) {
            dates.push({'date': '', 'MD': '', 'BV': '', 'SP': ''});
        }
        return dates;
    }

    Y.on('io:complete', complete, this, []);

    Y.SmbSprintChart.loadSprint = function(sprintId) {
        Y.io(Routing.generate('smbox_stats_sprint_data', { sprint: sprintId }));
    };

}, '0.1', {requires: ['charts', 'io-base', 'json-parse', 'node']});

