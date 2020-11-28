"use strict";
/**
 *  Verantwortlich um die Attribute und Maße eines Paddels zu verwalten.
 *  @extends Subject
 */
class PaddleModel extends Subject{
	/**
	 * Erzeugt ein Paddelmodel
	 * @constructor
	 * @param {number} x - die x Koordinate des Paddels im Canvas.
	 * @param {number} y -die y Koordinate des Paddels im Canvas.
	 * @param {number} width - die Breite eines Paddels.
	 * @param {number} height - die Höhe eines Paddels.
	 * @param {String} color - die Farbe des Paddels.
	 */
	constructor(x,y,width,height,color){
		console.log("create PaddleModel object");
		super();
		this.x=x;
		this.y=y;
		this.height=height;
		this.width=width;
		this.color=color;
		this.dy = 10;
	}

	/**
	 * Bewegt das Paddle
	 */
	move(){
		this.y = this.y + this.dy;
	}
};

/**
 *  Verantwortlich für das Zeichnen eines Paddle im Canvas.
 *  @extends Observer
 **/
class PaddleView extends Observer {
	/**
	 * Erzeugt ein Objekt, welches sich um die visuelle Darstellung im Canvas kümmert.
	 * @constructor
	 * @param {PaddleModel} model - das Model des Paddel.
	 * @param {CanvasRenderingContext2D} context - Context auf dem gezeichnet wird.
	 */
	constructor(model,context){
		super();
		console.log("create PaddleView object");
		this.model=model; 
		this.context=context;
	}
	
	/**
	 * Zeichnet ein Paddle auf dem Context des Canvas.
	 */
	draw(){
		var context=this.context;
		context.fillStyle=this.model.color;
		context.fillRect(this.model.x, this.model.y, this.model.width, this.model.height);
	}

   /**
	 * Methode wird vom Subjekt aufgerufen um darüber zu informieren, dass das Canvas neu gezeichnet
	 * werden muss.
	 */
	update(){
		this.draw();
	}
	
};

