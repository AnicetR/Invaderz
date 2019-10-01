/**
 * gameObjects/object.gameover.js
 *
 * Gameover object
 *
 * @constructor create the gameover screen
 *
 * @author Anicet REGLAT
 */

function GameOver() {

    var self = this;
    this.ref = Engine.game.appendObjectList(self);


    this.context = Engine.context.get();
    this.draw = function () {
        Engine.debug = false;
        self.context.shadowColor = "rgba(255,255,255,0.5)";
        self.context.shadowBlur = 10;
        self.context.shadowOffsetX = 0;
        self.context.shadowOffsetY = 0;
        self.context.rect(0, 0, Engine.context.boundaries.maxX, Engine.context.boundaries.maxY);
        self.context.fillStyle = "rgba(0,0,0,0.7)";
        self.context.fill();

        self.context.font = "45px Consolas";

        self.context.strokeStyle = "#020d26";
        self.context.lineWidth = 3;

        self.context.strokeText("GAME OVER", 180, Engine.context.boundaries.maxY / 2 - 70);
        self.context.fillStyle = "#fffdfe";
        self.context.fillText("GAME OVER", 180, Engine.context.boundaries.maxY / 2 - 70);

        self.context.font = "25px Consolas";

        self.context.strokeText("Votre score : "+SpaceInvader.score, 180, Engine.context.boundaries.maxY / 2);
        self.context.fillStyle = "#fffdfe";
        self.context.fillText("Votre score : "+SpaceInvader.score, 180, Engine.context.boundaries.maxY / 2);

        self.context.strokeText("Ctrl + R pour réessayer", 180 , Engine.context.boundaries.maxY / 2 + 40);
        self.context.fillStyle = "#fffdfe";
        self.context.fillText("Ctrl + R pour réessayer", 180 , Engine.context.boundaries.maxY / 2 + 40);
    };

    this.updateObject = function () {

    };

    this.drawObject = function () {
        self.draw();
    };
}

