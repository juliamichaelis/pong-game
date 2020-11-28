"use strict";
/**
 *  Verantwortlich um die Inhalte einer Trennliniene zu verwalten. 
 *  @extends Subject
 **/
class NetModel extends Subject {

    /**
	 * Erzeugt das Model der Trennlinie.
     * @constructor
     * @param {String} color- die Farbe der Trennlinie
     * @param {array} lineDash- die Abstände und Größe der gestrichelten Linie
	 * @param {number} lineWidth - die Breite der Trennlinie
     */
	constructor(color,lineDash,lineWidth){
		super();
		console.log("create NetModel object");		
        this.color=color;
        this.lineDash=lineDash;
        this.lineWidth=lineWidth;
    }
};

/**
 *  Verantwortlich für das Zeichnen einer Trennlinie im Canvas.
 *  @extends Observer
 **/
class NetView extends Observer {
	/**
	 * Erzeugt ein Objekt, welches sich um die visuelle Darstellung im Canvas kümmert.
	 * @constructor
	 * @param {NetModel} model - das Model der Trennlinie
	 * @param {CanvasRenderingContext2D} context - Context auf dem gezeichnet werden soll.
	 */
	constructor(canvasmodel,context){
		super();
		console.log("create NetView object");
		this.model=canvasmodel;
		this.context=context;
	}
	
	/**
	 * Zeichnet auf den Context des Canvas. 
	 */
	draw(){
		
		this.context.setLineDash(this.model.lineDash);
		this.context.beginPath();	
        this.context.lineWidth=this.model.lineWidth;
		this.context.strokeStyle=this.model.color;
        this.context.moveTo((this.context.canvas.getAttribute('width')/2)-this.model.lineWidth/2, 0);
        this.context.lineTo((this.context.canvas.getAttribute('width')/2)-this.model.lineWidth/2,this.context.canvas.getAttribute('height'));
        this.context.stroke();
	}

    /**
	 * Methode wird vom Subjekt aufgerufen um darüber zu informieren, dass das Canvas neu gezeichnet
	 * werden muss.
	 */
	update(){
		this.draw();
	}
	
};