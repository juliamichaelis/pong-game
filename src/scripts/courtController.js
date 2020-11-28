"use strict";
class CourtController{
    /**
     * Initialisiert die EventListener um das Spiel zu starten und zu bedienen.
     * Initialisiert die Spiellogik. 
     */
    constructor(canvasModel,userPaddleModel, pcPaddleModel, ballModel,context,scoremodel, scoremodel2, textModel,canvasElement){
        console.log("create CourtController object");
        this.game = new Game(canvasModel,ballModel,pcPaddleModel, userPaddleModel,context,scoremodel,scoremodel2,textModel);
        this.userPaddleModel=userPaddleModel;
        this.down = false;
        this.left = false;
        this.court = canvasElement;
        console.log("-> create eventListener for mouseclick");
        this.court.addEventListener('click',function(e){this.onclick(e)}.bind(this),false);
        
        /**
         * Sorgt dafür, dass bei einem gestarteten Spiel der Spieler das Paddle mit der Maus
         * bedienen kann.
         */
        console.log("_> create mousemove eventlistener");
        this.court.addEventListener('mousemove',function(e){
                this.userPaddleModel.y = e.clientY - this.court.offsetTop- this.userPaddleModel.height/2
            + document.body.scrollTop}.bind(this),false); 
        
       
        /**
         * Sorgt dafür, dass bei einem gestarteten Spiel der Spieler das Paddle mit der Tastatur
         * bedienen kann.
         */
        console.log("->create Eventlistener for keydown");
        window.addEventListener('keydown',function(e){
                if(e.which == 32){
                    this.onclick(e);
                }
                if(e.which == 40){
                 this.userPaddleModel.y = this.userPaddleModel.y +50;
                } 
                if(e.which == 38){
                 this.userPaddleModel.y = this.userPaddleModel.y -50;
                }
             }.bind(this));
    }
    /**
     * Die Methode stoppt (pause) oder startet das Spiel.
     * @param {event} e - click event der Maus
     */

    onclick(e){
        console.log("call CourtController.onClick -> click on court");
        if(this.game.gameStarted==false){
            this.game.start();
        }
        else{
            this.game.pause();
        }
          
    }
}