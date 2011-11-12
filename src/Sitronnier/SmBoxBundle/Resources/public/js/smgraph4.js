YUI().use('charts', 'io-base', 'json-parse', function (Y) {
    var myChart;

    // chart values
    var myDataValues = [
    ];

    var fillDates = function(dates) {
        while (dates.length < 10) {
            dates.push({'date':'', 'MD':'', 'BV':'', 'SP':''});
        }
        return dates;
    }

    // decide what serie to show
    var shownSeries = ['MD', 'BV', 'SP'];

    var axes = {
        md:{
            keys:["MD"],
            position:"left",
            type:"numeric",
            minimum: 0,
            maximum: 9
        },
        bv:{
            keys:["BV"],
            position:"right",
            type:"numeric",
            minimum: 0,
            maximum: 50
        },
        sp:{
            keys:["SP"],
            position:"right",
            type:"numeric",
            minimum: 0,
            maximum: 20
        },
        dates:{
            keys:["date"],
            position:"bottom",
            type:'category',
//            type:"time",
//            labelFormat: "%a %b %d",
//            minimum: '11/06/2011',
//            maximum: '11/20/2011',
            styles:{
                majorTicks:{
                    display: "none"
                },
                label: {
                    rotation:-45,
                    margin:{top:5}
                }
            }
        }
    };

    var seriesCollection = [
         {
            type:"combo",
            xAxis:"dates",
            yAxis:"md",
            xKey:"date",
            yKey:"MD",
            xDisplayName:"Date",
            yDisplayName:"Man/Days",
        },
        {
            type:"combo",
            xAxis:"dates",
            yAxis:"bv",
            xKey:"date",
            yKey:"BV",
            xDisplayName:"Date",
            yDisplayName:"Business Value",
        },
        {
            type:"combo",
            xAxis:"dates",
            yAxis:"sp",
            xKey:"date",
            yKey:"SP",
            xDisplayName:"Date",
            yDisplayName:"Story Points",
        }
    ];


    var url = '/app_dev.php/stats/sprint/2';

    function complete(id, o, args) {
        var result = Y.JSON.parse(o.responseText).sprint;

        // Transform data for chart
        myDataValues = defineDataProvider(result);
        updateAxes(result);

        // Instantiate and render the chart
        myChart = new Y.Chart({
            dataProvider: fillDates(myDataValues),
            render: "#graph-canvas",
            categoryKey: 'date',
    //        categoryType: 'time',
            seriesKeys: shownSeries,
            axes: axes,
            horizontalGridlines: true,
            verticalGridlines: true,
            seriesCollection: seriesCollection
        });
    };

    function updateAxes(result) {
        //myChart.getAxisByKey('bv').set('maximum', result.nbBV);
        axes.bv.maximum = result.nbBV;
        axes.sp.maximum = result.nbSP;
    };

    function defineDataProvider(result) {
        var data = [{'date':'', 'MD':0, 'BV':0, 'SP':0}];
        var cSP = 0;
        var cBV = 0;
        var cMD = 0;
        Y.each(result.days, function(day) {
            cSP += day.nbSP;
            cBV += day.nbBV;
            cMD += day.nbHours;
            data.push({'date':day.date, 'MD':cMD/8, 'BV':cBV, 'SP':cSP});
        });
        return data;
    };

    Y.on('io:complete', complete, this, []);
    var request = Y.io(url);
});

