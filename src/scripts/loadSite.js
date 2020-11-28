"use strict";

/**
 * Lädt eine HTML Seite per javascript.
 * Wird von der Seite pong.html genutzt um highscore.html aufzurufen um einen Highscore
 * in die Liste eintragen zu können.
 * Wird zusätzlich von der Seite highscore.html genutzt um die pong.html aufzurufen, wenn
 * ein highscore eingetragen worden ist.
 * @param {string} url 
 */
var load = function(url){
	console.log("call load from loadSite.js");
	window.location.assign(url);
}