/**
 * File: index.js
 * Author: Julia Michaelis
 * Datei stellt eine load Methode zur Verfügung, die die notwendigen Initialisierungen
 * für die Datei index.html vornimmt;
 */
"use strict";


/**
 * Funktion lädt das Menu nach und initialisiert das Globale Objekt zur Steuerung der Hintergrundmusik.
 */
var init = function(){
  try{
    console.log('init');
    initMusic();
    loadmenu('./html/menu.html');
    htmlloader = new HTMLLoader("./html/");
  }catch(e){
    console.log(e);
		document.body.innerHTML = '';
		var error = document.createElement('div');
		error.setAttribute("class", "error");
		error.innerHTML = e.message;
		document.body.appendChild(error);
  }
};