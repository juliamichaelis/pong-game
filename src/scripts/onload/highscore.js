"use strict";
/** Globles Objekt für die Verwaltung des Highscores */
var highscoremodel;

/** Funktion initialisiert das Globale Objekt zur Steuerung der Hintergrundmusik und 
 * lädt die HighscoreTabelle. */
var init = function(){
  try{
    console.log("init");
    initMusic();
    loadmenu('./menu.html');
    htmlloader = new HTMLLoader("./");
    var htmlElement = document.getElementById('content');
    highscoremodel = new HighscoreModel();
    var highscoreview = new HighscoreView(highscoremodel,htmlElement);
    highscoremodel.attachObserver(highscoreview);
    highscoremodel.notifyObservers();
    window.addEventListener('unload',function(event) {
      beforeunload();
    });
  }catch(e){
    console.log(e);
		document.body.innerHTML = '';
		var error = document.createElement('div');
		error.setAttribute("class", "error");
		error.innerHTML = e.message;
		document.body.appendChild(error);
  }
};

/** 
 * Methode wir aufgerufen, bevor die Seite highscore.html verlassen wird.
 * Falls die Seite automatisch nach dem Ende eines Spiel verlassen wird,
 * ohne einen Namen für den Highscore einzutragen wird der Highscoreeintrag mit
 * ohne Namen gefüllt.
 */
var beforeunload = function(){
  console.log('call beforunload -> add highscore item with name ohne Namen');
  highscoremodel = new HighscoreModel();
  var htmlElement = document.getElementById('content');
  var highscoreview = new HighscoreView(highscoremodel,htmlElement);
  highscoremodel.attachObserver(highscoreview);
  highscoremodel.notifyObservers();
  highscoremodel.saveName(insertValue);
}