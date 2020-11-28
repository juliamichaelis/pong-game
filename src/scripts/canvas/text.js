"use strict";
/**
 *  Verantwortlich um die Attribute und Maaße eines TextModel zu verwalten.
 *  @extends Subject
 */ 
class TextModel extends Subject{
    /**
     * @constructor
     * @param {number} x - x-Koordinate des Textfields
     * @param {number} y - y-Koordinate des Textfields
     * @param {string} color - die Farbe des Texts.
     * @param {string} font - die Schrift und Größe des Texts.
     */
    constructor(x,y, color,font, text){
		super();
		console.log("create TextModel object");
    	this.x=x;
    	this.y=y;
    	this.color=color;
    	this.font=font;
    	this.text=text;
    }

};

/**
 *  Verantwortlich für das Zeichnen eines Text im Canvas.
 *  @extends Observer
 */
class TextView extends Observer {
	/**
	 * Erzeugt ein Objekt, welches sich um die visuelle Darstellung im Canvas kümmert.
	 * @constructor
	 * @param {Textmodel} model - Model des Texts.
	 * @param {CanvasRenderingContext2D} context - Context auf dem gezeichnet wird.
	 */
	constructor(model,context){
		super();
		console.log("create TextView object");
		this. model=model;
		this.context=context;
	}

    /**
	 * Zeichnet auf den Context des Canvas. 
	 */
	draw(){
			var context = this.context;
			context.textAlign="center";
			context.textBaseline="middle";
 			context.fillStyle=this.model.color;
 			context.font=this.model.font;
			context.fillText(this.model.text,this.model.x,this.model.y);
		}
	
	/**
	 * Methode wird vom Subjekt aufgerufen um darüber zu informieren, dass das Canvas neu gezeichnet
	 * werden muss.
	 */
	update(){
		this.draw();
	}
}	
