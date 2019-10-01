/**
 * gameObjects/object.enemy.js
 *
 * Enemy object
 *
 * @param type {string} Wich type of enemy is it
 * @param x {int} initial x position on screen
 * @param y {int} initial y position on screen
 * @constructor create an enemy
 *
 * @author Anicet REGLAT
 */
function Enemy(type, x, y) {

    var self = this;
    this.ref = Engine.game.appendObjectList(self);

    this.position = {x: x, y: y};
    this.alive = true;

    this.type = type;

    this.speed = 1;
    this.shotRate = new Engine.utils.rate(1000 / (SpaceInvader.level * 1.2));

    this.moveRate = new Engine.utils.rate(500);

    this.sprite = new Image();
    this.sprite.src = "assets/img/e_spaceship_" + type + ".png";
    this.sprite.draw = function () {
        Engine.context.addSprite(self.sprite, self.position.x, self.position.y);
        self.shotRate.do(
            function () {
                if (type <= 2) {
                    var randomNumber = Math.floor(Math.random() * (100 - 1)) + 1;
                    if (randomNumber > 80)
                        new Projectile(self.position.x + (self.sprite.width / 2), self.position.y, 0.5, "bottom", "#fa585a", ["player"]);
                }
            }
        )
    };

    this.onCollide = function () {
        Engine.game.deleteObjectInList(self.ref);
        self.collideBox.destroy();
        SpaceInvader.enemy_died(type);
    };

    this.collideBox = new Engine.utils.collideBox({x: 0, y: 0}, self.sprite.width, "enemy", ["player"], self.onCollide);
    this.collideBox.init();

    this.toPosition = 0;

    this.updateObject = function () {


        self.moveRate.do(function () {
            if (self.position.x === self.toPosition || self.toPosition === 0) {
                var randomNumber = Math.floor(Math.random() * (50 - 1)) + 1;
                if (self.position.x < (Engine.context.boundaries.maxX - self.sprite.width)) {
                    if (randomNumber > 45 && self.position.x > self.sprite.width)
                        randomNumber = randomNumber * -1;
                    self.toPosition = self.position.x + randomNumber * (SpaceInvader.level);
                }
                else
                    self.toPosition = randomNumber;
            }
        });
        if(self.position.x !== self.toPosition){
            if (self.position.x - self.toPosition > 0 ) {
                self.position.x -= 1;
            }
            else {
                self.position.x += 1;
            }
        }


        self.collideBox.update({
            x: self.position.x + self.sprite.width / 2,
            y: self.position.y + self.sprite.height / 2
        }, self.sprite.width / 2.5);

    };

    this.drawObject = function () {
        self.sprite.draw();
    };
}
