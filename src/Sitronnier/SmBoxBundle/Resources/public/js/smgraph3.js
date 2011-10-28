SmGraph3 = function() {

    function draw() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Day');
        data.addColumn('number', 'MD');
        data.addColumn('number', 'SP');
        data.addColumn('number', 'BV');
        data.addRow([   "Mo 24.10",   0,  0,  0]);
        data.addRow([   "Tu 25.10",   2,  0,  0]);
        data.addRow([   "We 26.10",   3,  3,  50]);
        data.addRow([   "Th 27.10",   5,  8,  70]);
        data.addRow([   "Fr 28.10",   7,  10, 80]);

        var chart = new google.visualization.LineChart(document.getElementById('graph-canvas'));
        chart.draw(data, {  width: 600, 
                            height: 400, 
                            title: 'Sprint Burnup', 
                            pointSize: 4,
                            lineWidth: 3,
                            backgroundColor: '#fff',
                            series: [{color: 'black', targetAxisIndex: 0}, {color: 'yellow', targetAxisIndex: 1}, {color: 'orange', targetAxisIndex: 2}],
                            vAxes: [    {gridlineColor: 'white', textPosition: 'none', viewWindowMode: 'explicit', viewWindow: {min: 0, max: 7}}, 
                                        {gridlineColor: 'white', textPosition: 'none', viewWindowMode: 'explicit', viewWindow: {min: 0, max: 10}}, 
                                        {gridlineColor: 'white', textPosition: 'none', viewWindowMode: 'explicit', viewWindow: {min: 0, max: 80}}],
                        hAxis: {slantedText: true, slantedTextAngle: 30}
        });
    }

    return {
        'draw': draw
    }
}();

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(SmGraph3.draw);

