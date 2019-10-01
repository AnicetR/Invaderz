/**
 * gameObjects/backgrounds/object.backgroundBack.js
 *
 * background of the game
 * @constructor create the background
 *
 * @author Anicet REGLAT
 */

function BackgroundBack() {

    var self = this;

    this.position = {x: 0, y: 0};
    this.speed = 0.4;

    this.ref = Engine.game.appendBackgroundList(self);

    this.layer = 0;

    this.bg = new Image();
    this.bg.src = "assets/img/bg-back.png";
    this.bg.draw = function () {
        Engine.context.addRepeatableBackground(self.bg, self.position.x, self.position.y);
    };



    this.updateObject = function () {
        self.position.y += self.speed;
        if (self.position.y >= (self.bg.height - Engine.context.boundaries.maxY))
            self.position.y = -Engine.context.boundaries.maxY;
    };

    this.drawObject = function () {
        self.bg.draw();
    }


}
