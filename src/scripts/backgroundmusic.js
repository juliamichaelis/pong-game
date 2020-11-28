"use strict";
/** Globales Objekt für die Steuerung der Hintergrundmusik. */
let audioWrapper;

/** 
 * Initialisierung des globalen Objekt audioWrapper.
 */
var initMusic = function(){
    audioWrapper = new BackgroundMusic();
}

/**
 * Steuerung der Hintergrundmusik. Die zugehörige HTML Seite muss ein AUDIO Element
 * mit der id backgroundMusic besitzen.
 */
class BackgroundMusic {
    /**
     * Konstruktur setzt beim HTML 5 Element audio, die Musik auf Pause und
     * stellt eine Endlosschleife ein. 
     * @constructor
     */
    constructor(){
        console.log("create BackgroundMusic object")
        try{
            document.getElementById('backgroundMusic').loop = true;
            document.getElementById('backgroundMusic').muted = true;
        }catch(e){
            console.warn("can not create BackgroundMusic object");
        }
    }

    /**
     * Methode ist dafür zuständig die Musik an und auszuschalten.
     */
    switchMute(){
        console.log("call BackgroundMusic.switchMute");
        if(document.getElementById('backgroundMusic').paused == true){
            document.getElementById('backgroundMusic').play();
        }
       
        if(document.getElementById('backgroundMusic').muted == true){
            document.getElementById('backgroundMusic').muted = false;
        }
        else{
            document.getElementById('backgroundMusic').muted = true;
        }
    }

    /**
     * Methode gibt zurück, ob die Hintergrundmusik gerade läuft.
     * Die Soundeffekte im Spiel (game.js) sollen nur abgespielt werden,
     * wenn die Hintergrundmusik gerade läuft.
     * @return true, wenn die Hintergrundmusik gerade läuft, sonst false.
     */
    isPlaying(){
        console.log("call BackgroundMusic.isPlaying");
        if(document.getElementById('backgroundMusic').paused == true)
            return false;
        if(document.getElementById('backgroundMusic').muted == true)
            return false;
        return true;
    }
}

