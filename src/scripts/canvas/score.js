"use strict";
	/**
	 *  Verantwortlich um die Attribute und Maaße eines Punktestandes zu verwalten.
 	 *  @extends Subject
 	 */
	class ScoreModel extends Subject{
		/**
		 * Erzeugt ein ScoreModel.
		 * @constructor
		 * @param {number} x - x-Koordinate der Scoreanzeige.
		 * @param {number} y - y-Koordinate der Scoreanzeige.
		 * @param {string} color - die Farbe des Scores.
         * @param {string} font- die Schrift und Größe der Scoreanzeige.
		 * 
		 */
		constructor(x,y, color,font){
			super();
			console.log("create ScoreModel object");
			this.x=x;
			this.y=y;
			this.color=color;
        	this.font=font;
        	this.score=0;
		}
};

/**
 *  Verantwortlich für das Zeichnen eines Score im Canvas.
 *  @extends Observer
 **/
class ScoreView extends Observer {
	/**
	 * Erzeugt ein Objekt, welches sich um die visuelle Darstellung im Canvas kümmert.
	 * @constructor
	 * @param {ScoreModel} model - Model des Scores.
	 * @param {CanvasRenderingContext2D} context - Context auf dem gezeichnet wird.
	 */
	constructor(model,context){
		super();
		console.log("create ScoreView object");
		this. model=model;
		this.context=context;
	}

	/**
	 * Zeichnet auf den Context des Canvas. 
	 */
	draw(){
		var context = this.context;
		context.textAlign="center";
 		context.fillStyle=this.model.color;
 		context.font=this.model.font;
		context.fillText(this.model.score,this.model.x,this.model.y);
		}

	/**
	 * Methode wird vom Subjekt aufgerufen um darüber zu informieren, dass das Canvas neu gezeichnet
	 * werden muss.
	 */
	update(){
		this.draw();

	}
}	


