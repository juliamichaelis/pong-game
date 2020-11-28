"use strict";
/**
 *  Verantwortlich um die Attribute und Maße eines Balls zu verwalten.
 *  @extends Subject
 */
 class BallModel extends Subject{
	/**
	 * Erzeugt ein Ballmodel.
	 * @constructor
	 * @param {number} x - x-Mittelpunktkoordinate des Kreises.
	 * @param {number} y - y-Mittelpunktkoordinate des Kreises.
	 * @param {string} color - Farbe des Balls.
	 * @param {number} arcRadius - Radius des Balls.
	 */
	constructor(x,y, color, arcRadius){
		super();
		console.log("create Ball object");
		this.x=x;
		this.y=y;
		this.color=color;
		this.arcRadius=arcRadius;
		this.startAngle=0;
		this.endAngle= Math.PI*2;
		this.clockwise= true;
		this.dx = 10;
		this.dy = 10;
	}

	/**
	 * Bewegt den Ball im Model.
	 */
	move(){
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
	}
};

/**
 *  Verantwortlich für die visuelle Darstellung eines Balls im Canvas.
 *  @extends Observer
 */
class BallView extends Observer {
	/**
	 * Erzeugt ein Objekt, welches sich um die visuelle Darstellung im Canvas kümmert.
	 * @constructor
	 * @param {BallModel} - Model des Balls.
	 * @param {CanvasRenderingContext2D} - 2d context des Canvas.
	 */
	constructor(model,context){
		super();
		console.log("create BallView object");
		this. model=model;
		this.context=context;
	}

    /**
	 * Zeichnet auf den Context des Canvas. 
	 */
	draw(){
		var context = this.context;
 		context.fillStyle=this.model.color;
 		context.beginPath();
		context.arc(this.model.x, this.model.y, this.model.arcRadius, this.model.startAngle, this.model.endAngle,this.model.clockwise);
		context.fill();		
	}

	/**
	 * Methode wird vom Subjekt aufgerufen um darüber zu informieren, dass das Canvas neu gezeichnet
	 * werden muss.
	 */
	update(){
		this.draw();
	}



	
}	


