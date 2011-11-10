YUI().use('charts', function (Y) {
    // chart values
    var myDataValues = [
        {'date':'11/06/2011', 'MD':0, 'BV':0,  'SP':0},
        {'date':'11/07/2011', 'MD':3, 'BV':0,  'SP':2},
        {'date':'11/08/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/09/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/10/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/11/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/12/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/13/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/14/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/15/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/16/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/17/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/18/2011', 'MD':5, 'BV':20, 'SP':5},
        {'date':'11/19/2011', 'MD':5, 'BV':20, 'SP':5},
    ];

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

    // Instantiate and render the chart
    var mychart = new Y.Chart({
        dataProvider: myDataValues,
        render: "#graph-canvas",
        categoryKey: 'date',
//        categoryType: 'time',
        seriesKeys: shownSeries,
        axes: axes,
        horizontalGridlines: true,
        verticalGridlines: true,
        seriesCollection: seriesCollection
    });
});

