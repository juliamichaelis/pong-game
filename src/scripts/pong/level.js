"use strict";
/**
 * Ist verantwortlich das aktulle Level während des Spiels zu verwalten.
 */
class GameLevel {
    /**
     * Erzeugt ein GameLevel und setzt das aktuelle Level auf das Anfangslevel.
     */
    constructor(){
        console.log('create GameLevel object');
        this.levels = new Levels();
        this.state = this.levels.getLevel();
    }
    /**
     * Reset lädt die Level aus dem JSON File json-data/levels.json und setzt
     * das aktuelle Level auf das erste Level.
     */
    reset(){
        console.log('call GameLevel.reset');
        this.levels = new Levels();
        this.state = this.levels.getLevel();
    }
    /**
     * Setzt das Level hoch.
     */
    nextLevel(){
        console.log('call GameLevel.nextLevel');
        this.levels.next();
        this.state = this.levels.getLevel();   
    }
}

/**
 * Ist zuständig die Levels aus einer JSON Datei zu laden und 
 * eine einfache Schnittstelle zur Verfügung zu stellen.
 */
class Levels {
    /**
     * Erzeugt Levels.
     * @throws alle Fehler.
     */
    constructor(){
        try{
            console.log('create Levels object');
            this.i = 0;
            this.levels = undefined;
            this.load();
            console.log(this.levels);
        }catch(e){
            throw e;
        }
    }
    /**
     * Setzt aktuellen Level auf 0
     * @throws alle Fehler
     */
    reset(){
        console.log('call Levels.reset');
        this.levels = 0;
    }
    /**
     * Gibt aktuellen Level zurück.
     * @throws alle Fehler
     */
    getLevel(){
        console.log('call Levels.getLevel');
        return this.levels[this.i];
    }
    /**
     * Setzt das Level hoch.
     */
    next(){
        console.log('call Levels.next');
        if(this.i < this.levels.length-1){
            this.i = this.i+1;
        }
    }
    /**
     * Lädt die Levels aus der JSON Datei.
     * @throws alle Fehler
     */
    load(){
        try{
            console.log('Levels.load');
            var xhttp = new XMLHttpRequest();
            var levels = undefined;
            xhttp.onreadystatechange = function(){
                console.log("-> xhttp.readyState " + xhttp.readyState +" xhttp.status " + xhttp.status);
                if(xhttp.readyState == 4 && xhttp.status == 200){
                    levels =  JSON.parse(xhttp.responseText);
                }
                if(xhttp.readyState == 4 && xhttp.status == 404){
                    console.error('Can not load ../json-data/levels.json');
                }
            }.bind(levels);
            xhttp.open("GET","../json-data/levels.json",false);
            xhttp.send();
            if(levels==undefined){
                var error = new Error("Can not load level data json-data/levels.json");
                throw error;
            }
            this.levels = levels;
        }catch(e){
            throw e;
        }
    }
}


