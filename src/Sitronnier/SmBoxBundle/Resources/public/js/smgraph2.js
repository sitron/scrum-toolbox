SmGraph2 = function() {

    function draw() {
        var r = Raphael("graph-canvas"),
        txtattr = { font: "12px 'Fontin Sans', Fontin-Sans, sans-serif" };

        // var x = [], y = [], y2 = [], y3 = [];

        // for (var i = 0; i < 1e6; i++) {
        //     x[i] = i * 10;
        //     y[i] = (y[i - 1] || 0) + (Math.random() * 7) - 3;
        //     y2[i] = (y2[i - 1] || 150) + (Math.random() * 7) - 3.5;
        //     y3[i] = (y3[i - 1] || 300) + (Math.random() * 7) - 4;
        // }

        r.text(160, 10, "Simple Line Chart (1000 points)").attr(txtattr);
        // r.text(480, 10, "shade = true (10,000 points)").attr(txtattr);;
        // r.text(160, 250, "shade = true & nostroke = true (1,000,000 points)").attr(txtattr);
        // r.text(480, 250, "Symbols, axis and hover effect").attr(txtattr);

        // r.linechart(10, 10, 300, 220, x, [y.slice(0, 1e3), y2.slice(0, 1e3), y3.slice(0, 1e3)]).hovercolumn(function () {
        //     this.set = r.set(
        //         r.circle(this.x, this.y[0]),
        //         r.circle(this.x, this.y[1]),
        //         r.circle(this.x, this.y[2])
        //         );
        // }, function () {
        //     this.set.remove();
        // });

        //r.linechart(330, 10, 300, 220, x, [y.slice(0, 1e4), y2.slice(0, 1e4), y3.slice(0, 1e4)], { shade: true });
        //r.linechart(10, 250, 300, 220, x, [y, y2, y3], { nostroke: true, shade: true });

        // var lines = r.linechart(330, 250, 300, 220, [[1, 2, 3, 4, 5, 6, 7],[3.5, 4.5, 5.5, 6.5, 7, 8]], [[12, 32, 23, 15, 17, 27, 22], [10, 20, 30, 25, 15, 28]], { nostroke: false, axis: "0 0 1 1", symbol: "circle", smooth: true }).hoverColumn(function () {
        //     this.tags = r.set();

        //     for (var i = 0, ii = this.y.length; i < ii; i++) {
        //         this.tags.push(r.tag(this.x, this.y[i], this.values[i], 160, 10).insertBefore(this).attr([{ fill: "#fff" }, { fill: this.symbols[i].attr("fill") }]));
        //     }
        // }, function () {
        //     this.tags && this.tags.remove();
        // });
        var lines = r.linechart(20, 20, 500, 500, [[0,1,2,3], [0,20]], [[0,5,5,15], [0,20]], { nostroke: false, axis: "0 0 1 1", symbol: "circle", smooth: false });

        lines.symbols.attr({ r: 5 });
        lines.lines[1].attr({"stroke-width": 1, 'stroke-dasharray':'-'});
        // lines.symbols[0].attr({stroke: "#fff"});
        // lines.symbols[0][1].animate({fill: "#f00"}, 1000);
    };

    return {
        'draw': draw
    }
}();

SmGraph2.draw();
