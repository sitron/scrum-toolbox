SmGraph = function() {
    var canvas, stage, bg;

    function draw() {
        canvas = document.getElementById("graph-canvas");
        stage = new Stage(canvas);
        bg = new Shape();
        stage.addChild(bg);

	    bg.graphics.beginStroke("#ff0000")
            .setStrokeStyle(2, 1)
	    	.moveTo(0, 0)
	    	.lineTo(20, 30)
	    	.lineTo(50, 40)
	    	.lineTo(120, 50)
	    	.endStroke()

        stage.update();
    }

    return {
        'draw': draw
    }
}();

SmGraph.draw();
