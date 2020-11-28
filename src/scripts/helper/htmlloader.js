"use strict";

/** 
 * Globales HTMLLoader Objekt, muss beim Laden einer Seite initialisiert werden, wenn das Menu
 * html/menu.html per AJAX nachgeladen wird.
 */
let htmlloader;

/**
 * Klasse ist zuständig für das Laden von Seiten, wenn auf ein
 * Menüpunkt gedrückt wird.
 */
class HTMLLoader{
	
	/**
	 * Je nachdem auf welcher HTML Seite der HTMLLoader genutzt wird ist ein Prefix anzugeben.
	 * @constructor
	 * @param {string} prefix - Prefix der zu ladenen Seiten (url).
	 */
	constructor(prefix){
		console.log('create HTMLLoader object');
		this.prefix = prefix;
	}

	/**
	 * Lädt eine Seite in das aktuelle Browserfenster.
	 * @param {string} sitename - Seitenname der Seite die geladen werden soll (ohne Prefix).
	 */
	load(sitename){
		console.log('HTMLLoader.load(' + sitename);
		var prefix = this.prefix;
		setTimeout(function(){window.location=prefix + sitename});
	}
}