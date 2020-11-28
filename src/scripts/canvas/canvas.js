"use strict";
/**
 *  Verantwortlich um die Inhalte eines 2d Context eines Canvas zu verwalten. 
 *  @extends Subject
 **/
class CanvasModel extends Subject {

    /**
     * Erzeugt ein CanvasModel. 
     * @param {number} width - die Breite des Canvaselements.
     * @param {number} height - die Höhe des Canvaselements.
     */
	constructor(width, height) {
		super();
		console.log("create CanvasModel object");
		this.height = height;
		this.width = width;
		this.courtElemente = [];// beinhaltet alle Elemente(Ball,Paddle in allen Positionen)
	}
};

/**
 *  Verantwortlich für die visuelle Darstellung im Canvas.
 *  @extends Observer
 */
class CanvasView extends Observer {

	/**
	 * Erzeugt ein Objekt, welches sich um die visuelle Darstellung im Canvas kümmert.
	 * @constructor
	 * @param {CanvasModel} model - das Model des Canvas.
	 * @param {CanvasRenderingContext2D} context - Context auf dem gezeichnet werden soll.
	 */
	constructor(canvasmodel, context) {
		super();
		console.log("create CanvasView object");
		this.model = canvasmodel;
		this.context = context;
	}

	/**
	 * Zeichnet auf den Context des Canvas. 
	 */
	draw() {
		this.context.fillStyle = this.model.color;
		this.context.clearRect(0, 0, this.model.width, this.model.height);
		this.model.courtElemente.forEach(function (element) {
			element.notifyObservers();
		});
	}

   /**
	 * Methode wird vom Subjekt aufgerufen um darüber zu informieren, dass das Canvas neu gezeichnet
	 * werden muss.
	 */
	update() {
		this.draw();
	}

};