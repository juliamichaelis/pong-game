"use strict";
/**
 * Variable wird eingefügt, wenn kein Name eingegeben wurde.
 */
let insertValue ='ohne Namen';
/**
 * Klasse für den Highscoremodel
 */
class HighscoreModel extends Subject {
	/**
	 * Konstruktor für das Highscoremodel.
	 */
	constructor(){
		super();
		console.log('create HighscoreModel object');
		this.highscore = [];
		this.load();
		this.sort();
	}

	/**
	 * Fügt ein Highscoreelement in die Highscoreliste ein und sortiert
	 * diese.
	 * @param {object} highscoreItem - Highscoreeintrag 
	 */
	addItem(highscoreItem){
		console.log('call HighscoreModel.addItem ' + highscoreItem);
		this.highscore.push(highscoreItem);
		this.sort();
	}

	sort(){
		console.log('call HighscoreModel.sort');
		this.highscore = this.highscore.sort(function(l,u){
			return u.points - l.points;
		});	
	}

	/**
	 * Speichert das Array von Highscoreeinträgen im localStorage
	 */
	save(){
		console.log('call HighscoreModel.save');
		window.localStorage.setItem('highscore', JSON.stringify(this.highscore));
	}

	/**
	 * Lädt das Array von Highscoreeinträgen aus dem localStorage.
	 */
	load(){
		console.log('call HighscoreModel.load');
		var highscoreString = window.localStorage.getItem('highscore');
		console.log("!" + highscoreString);
		if(highscoreString == null)
			this.save();
		this.highscore = JSON.parse(localStorage.getItem('highscore'));
	}

	/**
	 * Fügt allen Elementen im HighscoreModel die ein Textfeld besitzen den Namen
	 * hinzu. Wird von der save Methode aufgerufen, die wiederum aufgerufen wird,
	 * wenn der Spieler seinen Namen eingegeben hat und Enter drückt.
	 * @param {string} name - Name des Spielers für den Highscore.
	 */
	saveName(name){
		console.log('call HighscoreModel.saveName');
		this.highscore.forEach(function(element){
			if(element.name == '<input type="text" id="name" title="Mit Enter beenden" onkeypress="save(event,this)"></input>'){
					element.name = name;
			}
		});
		this.save();
	}

}

/**
 * Erzeugt den Highscore im HTML 5 DOM
 */
class HighscoreView extends Observer {
	/**
	 * Konstruktor
	 * @param {HighscoreModel} model 
	 * @param {HTMLElement} htmlElement in dem die Highscores angezeigt werden sollen.
	 */
	constructor(model,htmlElement){
		super();
		console.log('create HighscoreView');
		this.model = model;
		this.htmlElement = htmlElement;
	}

	/**
	 * Wird von notifyObserver aufgerufen, um die View zu aktualisieren.
	 */
	update(){
		console.log('call HighscoreView.update');
		var innerHTML = '<div class="divTable">' +
        				'<div class="divTableRow">' +
            			'<div class="divTableCellHeader">Platz</div>' +
            			'<div class="divTableCellHeader">Name</div>' +
            			'<div class="divTableCellHeader">Punkte</div>' +
						'</div>';
		var position = 1;
		this.model.highscore.forEach(function(item){
			if(position%2)
				innerHTML = innerHTML + '<div class="divTableRow">';
			else
				innerHTML = innerHTML + '<div class="divTableRowUneven">';

			innerHTML = innerHTML + '<div class="divTableCell">';
			innerHTML = innerHTML + position + '.';
			innerHTML = innerHTML + '</div>';

			
			innerHTML = innerHTML + '<div class="divTableCell">';
			innerHTML = innerHTML + item.name;
			innerHTML = innerHTML + '</div>';

			
			innerHTML = innerHTML + '<div class="divTableCell">';
			innerHTML = innerHTML + item.points;
			innerHTML = innerHTML + '</div>';

			innerHTML = innerHTML + '</div>';
			position++;
		});
		innerHTML = innerHTML + '</div>';
		this.htmlElement.innerHTML = innerHTML;
	}
}

/** 
 * Methode für eine Keypress eventlistener eines Highscoreelements in der HTML Seite.
 * Wenn Enter gedrückt wird, wird das HighscoreModel (Methode: saveName()) aufgerufen und
 * zurück zur Spielseite navigiert.
 * @param {event} event - KeypressEvent.
 * @param {HTMLElement} ele - Highscoreelement auf dem Enter gedrückt wurde.
 */
var save = function (event,ele){
	console.log("save in highscore.js");
	insertValue = ele.value;
	if (event.keyCode == 13) {
		console.log("-> save highscore");	
		var highscore = new HighscoreModel();
		highscore.saveName(ele.value);
		console.log('-> load ./pong.html');
		load('./pong.html');
	}
}

/**
 * Model für einen Highscoreeintrag.
 */
class HighscoreItem{
	/**	
	 * Konstruktor des Highscores
	 * @param {string} name - Name des Spielers 
	 * @param {number} points - Punkte des Spielers
	 */
	constructor(name, points){
		console.log('create HighscoreItem object');
		this.name = name;
		this.points = points;
	}
}