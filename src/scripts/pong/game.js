"use strict";
/**
 * Die Klasse Game ist für die Spiellogik und die Spielfeldinformationen 
 * verantwortlich
 */
class Game {
    /**
     * @param {canvasModel} canvasModel
     * @param {ballModel} ballModel
     * @param {paddleModel} paddleModelPc
     * @param {paddleModel} paddleModelPlayer
     * @param {CanvasRenderingContext2D}canvasContext
     * @param {scoremodel} scoremodel
     * @param {scoremodel} scoremodel2
     * @param {textModel} textModel
     * @throws alle Fehler
     */

    constructor(canvasModel, ballModel, paddleModelPc, paddleModelPlayer, canvasContext,scoremodel,scoremodel2, textModel){
        console.log('create Game object');
        this.ballModel = ballModel;
        this.canvasModel = canvasModel;
        this.paddleModelPc = paddleModelPc;
        this.paddleModelPlayer = paddleModelPlayer;
        this.canvasContext = canvasContext;
        this.scoremodel = scoremodel;
        this.scoremodel2 =scoremodel2;
        this.collision = new Collision(canvasContext);
        this.intervalTimer = undefined;
        this.textModel = textModel;
        this.gameStarted = false;
        this.hit = 0;
        this.gameLevel = new GameLevel();
        this.score = 0;
        this.lives = 3;
    }
    /**
     * Methode  um das Spiel zu starten bzw. die Pause zu beenden.
     * Wenn das Spiel beendet ist wird zur Highscoreseite navigiert um 
     * den Highscore einzutragen.
     */
    start(){
        console.log('call Game.start');
        if(this.lives == 0){
            console.log(' -> no lives save highscore');
            var highscore = new HighscoreModel();
            var highscoreItem = new HighscoreItem('<input type="text" id="name" title="Mit Enter beenden" onkeypress="save(event,this)"></input>',this.score);
            highscore.addItem(highscoreItem);
            highscore.save();
            this.score = 0;
            this.scoremodel.score = 0;
            this.scoremodel2.score = 0;
            load("./highscore.html");
        }
        if(!this.gameStarted && !this.lives==0){
            console.log(' -> start game');
            document.getElementById('tooltip').style.display="none";
            document.getElementById('level').innerHTML = this.gameLevel.state.level;
            document.getElementById('lives').innerHTML = this.lives;
            this.gameStarted = true;
            // Play oder Pause oder LevelAnzeige wird aus dem Canvas Model entfernt.
            var elementNumber = this.canvasModel.courtElemente.indexOf(this.textModel);
            this.canvasModel.courtElemente.splice(elementNumber);
            
            this.intervalTimer = setInterval(function(){this.internalStart()}.bind(this),this.gameLevel.state.intervalMilliseconds );
        }
    }
    
    /**
     * Steuert die Bewegungen von Ball und Paddle des Computers.
     * Prüft mit Hilfe der Kollisionsklasse (this.collision)
     *  - ob ein Sound abgespielt werden muss.
     *  - ob der Computer einen Punkt erhält.
     *  - ob der Spieler einen Punkt erhält.
     *  - beendet das aktuelle Spiel und ruft 
     *      - winGame wenn Spieler 10 Punkte hat.
     *      - loose wenn Computer 10 Punkte hat.
     */
    internalStart(){
        //Bewegungen
        this.ballModel.move();
        this.paddleModelPc.move();

        //Computer intelligenz
        if(this.hit < this.gameLevel.state.hit){
            if(this.paddleModelPc.y  > this.ballModel.y-this.ballModel.arcRadius){
                this.paddleModelPc.dy = -10;
            }
            if(this.paddleModelPc.y + this.paddleModelPc.height  < this.ballModel.y){
                this.paddleModelPc.dy = + 10;
            }
        }
        if(this.collision.pruefePaddleTop(this.paddleModelPc)){
            this.paddleModelPc.dy = 10;
        }
        
        if(this.collision.pruefePaddleBottom(this.paddleModelPc)){
            this.paddleModelPc.dy = -10;
        }

        if(this.collision.pruefePaddleTop(this.paddleModelPlayer)){
            this.paddleModelPlayer.y = 0;
        }
        
        if(this.collision.pruefePaddleBottom(this.paddleModelPlayer)){
            this.paddleModelPlayer.y = this.canvasModel.height - this.paddleModelPlayer.height;
        }

        if(this.collision.pruefeBallTop(this.ballModel)){
            this.ballModel.dy = 10;
            this.playWall();
        }
        
        if(this.collision.pruefeBallBottom(this.ballModel)){
            this.ballModel.dy = -10;
            this.playWall();
        }
        
        if(this.collision.pruefeBallRight(this.ballModel)){
            this.scoremodel.score = this.scoremodel.score+1;
            this.ballModel.x = 315;
            this.ballModel.y = 240;
            this.hit = 0;
            this.playWall();
            this.score = this.score + 1;
            
           
            if(this.scoremodel.score == 10){
                this.winGame();
            }
            document.getElementById('score').innerHTML = this.score;
        }
        
        if(this.collision.pruefeBallLeft(this.ballModel)){
            this.scoremodel2.score = this.scoremodel2.score + 1;
            this.ballModel.x = 315;
            this.ballModel.y = 240;
            this.playWall();
            if(this.scoremodel2.score == 10){
                this.loose();
                document.getElementById('lives').innerHTML = this.lives;
                
            }
        }

        if(this.collision.pruefeBallPaddle(this.ballModel, this.paddleModelPc )){
            if(this.ballModel.dx == -10){
                this.ballModel.dx = 10;  
            }
            else{
                this.ballModel.dx = -10;
            }
            this.hit = this.hit+1;
            this.playPong();
        }

        if(this.collision.pruefeBallPaddle(this.ballModel, this.paddleModelPlayer )){
            if(this.ballModel.dx == -10){
                this.ballModel.dx = 10;   
            }
            else{
                this.ballModel.dx = -10; 
            }
            this.hit = this.hit + 1;
            this.playPong();
        }
        
        this.canvasModel.notifyObservers();
    }

    /**
     * Wird aufgerufen, wenn der Spieler im aktuellen Spiel 10 Punkte erreicht hat.
     *  - Zeigt Tooltip an.
     *  - Aktualisiert den Highscore Punktestand laut gameLevel
     *  - Setzt Scores des aktuellen Spiels auf 0.
     *  - Lädt nächstes Level wenn vorhanden, sonst bleibt Level bestehen.
     */
    winGame(){
        console.log('call Game.winGame');
        document.getElementById('tooltip').style.display="block";
        this.score = this.score + this.gameLevel.state.dpoint;
        this.scoremodel.score = 0;
        this.scoremodel2.score = 0;
        this.gameLevel.nextLevel();
        document.getElementById('level').innerHTML = this.gameLevel.state.level;
        this.nextLevel();
    }

    /**
     * Wird aufgerufen, wenn Spieler verloren hat. 
     *
     * - Zeigt Tooltip an. 
     * - Pausiert Spiel und zeigt Game Over wenn keine Leben mehr vorhanden sind, 
     *   oder verloren an.
     * - Setzt score von PC und Spieler des aktuellen Spiel auf 0.
     * - Zeichnet Canvas neu.
     */
    loose(){
        console.log('call Game.loose');
        document.getElementById('tooltip').style.display="block";
        this.gameStarted=false;
        clearInterval(this.intervalTimer);
        this.scoremodel.score = 0;
        this.scoremodel2.score = 0;
        this.lives = this.lives -1;
        if(this.lives == 0)
            this.textModel.text = 'Game Over';
        else
            this.textModel.text = 'Verloren';
        this.canvasModel.courtElemente.push(this.textModel);
        this.canvasModel.notifyObservers();
        
    }

    /**
     * Zeigt Tooltip an und setzt TextModel um den Text des nächsten Level anzuzeigen.
     * Löscht den Intervalltimer für die Bewegung des Paddles des Computers und des Balls.
     * Zeichnet Canvas neu. 
     */
    nextLevel(){
        console.log('Game.nextLevel');
        document.getElementById('tooltip').style.display="block";
        this.gameStarted=false;
        this.textModel.text = this.gameLevel.state.level;
        this.canvasModel.courtElemente.push(this.textModel);
        clearInterval(this.intervalTimer);
        this.canvasModel.notifyObservers();
    }
    /**
     * Wird vom CourtController aufgerufen wenn der Spieler ein Spiel pausieren möchte.
     */
    pause(){
        console.log('call Game.pause');
        if(this.gameStarted){
            document.getElementById('tooltip').style.display="block";      
            this.gameStarted=false;
            this.textModel.text = "\u{23F8}";
            this.canvasModel.courtElemente.push(this.textModel);
            clearInterval(this.intervalTimer);
            this.canvasModel.notifyObservers();
            
        }
        
    }

    /**
     *  Methode um Geräuscheffekte der Schläger-Ball-Kollision zu erzeugen. 
     */
    playPong(){
        try{
            console.log('call Game.playPong');
            if(audioWrapper.isPlaying())
            new Audio('../music/paddle.wav').play();
        }catch(e){
            console.warn("can not play ../music/paddle.wav" + e);
        }
          
    }

    /**
     * Methode um Geräuscheffekte der Ball-Wand-Kollision zu erzeugen.
     */
    playWall(){
        try{
            console.log('call Game.playWall');
            if(audioWrapper.isPlaying())
                new Audio('../music/wall.wav').play();
        }catch(e){
            console.warn("can not play ../music/wall.wav");
        }
    }
}