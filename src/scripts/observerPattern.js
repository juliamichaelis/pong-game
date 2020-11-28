"use strict";
/**
 * Subjektklasse des Beobachtermusters 
 */
class Subject{
	/**
	 * Erzeugt ein Subjekt.
	 * @constructor
	 */
	constructor (){
		console.log('create Subject object');
		this.observers = [];
	}

	/**
 	 * Methode um einen observer hinzuzufügen
 	 * @param {Observer} observer - Ein Beobachter
 	 */
	attachObserver(observer){
			console.log('call Subject.attachObserver ' + observer);	
			this.observers.push(observer);	
	}

	/**
 	 * Methode um Beobachter über Änderungen zu benachrichtigen.
 	 */	
	notifyObservers(){
		var observersCount = this.observers.length;
		for (var i = 0; i < observersCount; i++){
			this.observers[i].update();	
		}	
	}
};

 /** 
	* Beobachter des Beobachtermusters.
  */
 class Observer{

	/**
	 * Methode wird vom Subject aufgerufen um über Änderungen zu informieren.
	 * Die Methode muss von den Unterklassen implementiert werden.
	 * @throws {Error} wenn die Methode vom der Unterklasse nicht implementiert wurde.
	 */
	update(){
		console.error("update muss von der Subklasse implementiert werden.");
		throw new Error("call of Abstract Method (Observer.update)");
	}
};
