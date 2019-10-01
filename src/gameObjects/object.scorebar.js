/**
 * gameObjects/object.scorebar.js
 *
 * Scorebar object
 *
 * @constructor create the scorebar
 *
 * @author Anicet REGLAT
 */
function Scorebar() {

    var self = this;

    this.ref = Engine.game.appendObjectList(self);

    this.position = {x: 30, y: 35 };


    this.context = Engine.context.get();

    this.draw = function () {
        self.context.font = "25px Consolas";

        self.context.strokeStyle = "#020d26";
        self.context.lineWidth = 3;

        self.context.strokeText("Points : "+SpaceInvader.score, self.position.x, self.position.y);
        self.context.fillStyle = "#fffdfe";
        self.context.fillText("Points : "+SpaceInvader.score, self.position.x, self.position.y);
    };

    this.updateObject = function () {

    };

    this.drawObject = function () {
        self.draw();
    }



}
