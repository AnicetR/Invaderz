/**
 * gameObjects/object.projectile.js
 *
 * Projectile object
 *
 * @param beginX {int} initial x position
 * @param beginY {int} initial y position
 * @param speed {int} speed (px/second)
 * @param orientation {string} top/bottom
 * @param color {string} color of the projectile
 * @param collideWith {Array<string>} names of the type of collisions they're colliding with
 * @constructor create a projectile
 *
 * @author Anicet REGLAT
 */

function Projectile(beginX, beginY, speed, orientation, color, collideWith) {

    var self = this;
    this.ref = Engine.game.appendObjectList(self);
    this.speed = speed;

    this.orientation = orientation;
    this.position = {x: beginX, y: beginY};

    this.color = color;
    this.sprite = {};

    this.sprite.radius = 0;

    this.drawIteration = 0;

    this.onCollide = function(){
        Engine.game.deleteObjectInList(self.ref);
        self.collideBox.destroy();
    };

    this.collideBox = new Engine.utils.collideBox(this.position, this.sprite.radius, "projectile", collideWith, self.onCollide);
    this.collideBox.init();

    this.sprite.draw = function () {
        var ctx = Engine.context.get();
        ctx.shadowColor = "#FFF";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.beginPath();
            ctx.arc(self.position.x, self.position.y, self.sprite.radius, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = self.color;
        ctx.fill();
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
        self.drawIteration++;
    };

    this.updateObject = function () {

        if(self.orientation === "bottom")
            self.position.y += self.speed * Engine.game.delta;
        else
            self.position.y -= self.speed * Engine.game.delta;

        self.collideBox.update(self.position, self.sprite.radius);

        if(self.drawIteration < 10)
            self.sprite.radius = self.drawIteration;
        else
            self.sprite.radius = 10;

        if ((self.position.y + self.sprite.radius * 2) < 0 || (self.position.y + self.sprite.radius * 2) > Engine.context.boundaries.maxY){
            self.onCollide();
        }
    };

    this.drawObject = function () {
        self.sprite.draw();
    };
}

