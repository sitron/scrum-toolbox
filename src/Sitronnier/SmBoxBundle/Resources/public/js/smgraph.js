SmGraph = function() {
    var canvas, stage, bg, container;

    function draw() {
        canvas = document.getElementById("graph-canvas");
        stage = new Stage(canvas);
        container = new Container();
        bg = new Shape();
        stage.addChild(container);
        container.addChild(bg);

	    bg.graphics.beginStroke("#ff0000")
            .setStrokeStyle(1, 1)
	    	.moveTo(0.5, 0.5)
	    	.lineTo(20.5, 30.5)
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
