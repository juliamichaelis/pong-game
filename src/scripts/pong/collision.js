"use strict";
/**
 * Kollisionsklasse-verantwortlich um die  Kollision von Objekten zu überprüfen
 */
class Collision{

    /**
     * @param {CanvasRenderingContext2D}context
     */
    constructor(context){
        console.log('create Collision object');
        this.minx = 0;
        this.maxx = context.canvas.getAttribute('width');
        this.miny = 0;
        this.maxy = context.canvas.getAttribute('height');
        
    }
    /**
     * Methode zur Überprüfung der Berührung eines Paddels mit der Obergrenze im Spielfeld
     * @param {paddleModel} paddleModel 
     * @returns true bei Kollision sonst false
     */
    pruefePaddleTop(paddleModel){
        if(paddleModel.y <= this.miny){
            return true;
        }
        return false;
    }
    /**
     * Methode zur Überprüfung der Berührung eines Paddels mit der Untergrenze im Spielfeld
     * @param {paddleModel} paddleModel 
     * @returns true bei Kollision sonst false
     */
    pruefePaddleBottom(paddleModel){
        if((paddleModel.y + paddleModel.height) >= this.maxy){
            return true;
        }
        return false;
    }
    /**
     * Methode zur Überrpüfung der Ballberührung mit der Obergrenze
     * @param {ballModel} ballModel 
     * @returns true bei Kollision sonst false
     */
    pruefeBallTop(ballModel){
        if((ballModel.y - ballModel.arcRadius) <= this.miny){
            return true;
        }
        return false;
    }
    /** 
     * Methode zur Überrprüfung der Kollision zwischen Ball und Untergrenze im Spielfeld
     * @param {ballModel} ballModel
     * @returns true bei Kollision sonst false
     */
    pruefeBallBottom(ballModel){
        if((ballModel.y + ballModel.arcRadius) >= this.maxy){
            return true;
        }
        return false;
    }
    /**
     * Methode zur Überprüfung der Kollision zwischen Ball und linker Wand im Spielfeld
     * @param {ballModel} ballModel
     * @returns true bei Kollision sonst false
     */
    pruefeBallLeft(ballModel){
        if((ballModel.x - ballModel.arcRadius) <= this.minx){
            return true;
        }
        return false;    
    }

    /**
     * Methode zur Überprüfung der Kollision zwischen Ball und rechter Wand im Spielfeld
     * @param {ballModel}
     * @returns true bei Kollision sonst false
     */
    pruefeBallRight(ballModel){
        if((ballModel.x + ballModel.arcRadius) >= this.maxx){
            return true;
        }
        return false;
    }

    /**
     * Methode überprüft eine Kollision zwischen Ball und Schläger
     * @param {ballModel} ballModel
     * @param {paddleModel} paddleModel
     * @returns true bei Kollision sonst false
     */
    pruefeBallPaddle(ballModel,paddleModel){
        var xBall = ballModel.x;
        var yBall = ballModel.y;
        var xmin = paddleModel.x;
        var xmax = paddleModel.x + paddleModel.width;
        var ymin = paddleModel.y;
        var ymax = paddleModel.y + paddleModel.height;
        if((xBall >= xmin)&&(xBall <= xmax)){
            if((yBall >= ymin)&&(yBall <= ymax)){
                return true;
            }
        }
        return false;
    }
}


