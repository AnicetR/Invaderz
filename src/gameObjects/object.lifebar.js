/**
 * gameObjects/object.lifebar.js
 *
 * Lifebar object
 *
 * @constructor create the lifebar
 *
 * @author Anicet REGLAT
 */
function Lifebar() {

    var self = this;

    this.ref = Engine.game.appendObjectList(self);

    this.position = {x: 0, y: 0 };

    this.value = 5;

    this.sprite = new Image();
    this.sprite.src = "assets/img/life/"+self.value+".png";
    this.sprite.draw = function () {
        self.sprite.src = "assets/img/life/"+self.value+".png";
        Engine.context.addSprite(self.sprite, self.position.x, self.position.y);
    };

    this.position.y = Engine.context.boundaries.maxX - self.sprite.height - 20;

    this.updateObject = function () {

    };

    this.drawObject = function () {
        self.sprite.draw();
    }



}
