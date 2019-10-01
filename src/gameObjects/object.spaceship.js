/**
 * gameObjects/object.spaceship.js
 *
 * Spaceship object
 * Manage the player's spaceship
 *
 * @constructor create the spaceship
 *
 * @author Anicet REGLAT
 */
function Spaceship() {

    var self = this;

    this.ref = Engine.game.appendObjectList(self);

    this.position = {x: 0, y: ( Engine.context.boundaries.maxX / 2) };
    this.alive = true;

    this.life = 5;

    this.speed = 0.5;
    this.shotRate = new Engine.utils.rate(350);

    this.skew = 0.2;

    this.sprite = new Image();
    this.sprite.src = "assets/img/spaceship.png";
    this.sprite.draw = function () {
        Engine.context.addSprite(self.sprite, self.position.x, self.position.y);
    };



    this.position.y = Engine.context.boundaries.maxY - self.sprite.height - 20;

    this.onCollide = function(){
        self.life = self.life - 1;

        lifeBar.value = self.life;
        if(self.life === 0){
            Engine.game.deleteObjectInList(self.ref);
            self.collideBox.destroy();
            SpaceInvader.gameOver();
        }
    };

    this.collideBox = new Engine.utils.collideBox(self.position, 10, "player", ["projectile"], self.onCollide);
    this.collideBox.init();

    Engine.audio.registerAudioClip("laserShot1", 'assets/sounds/laserblast.mp3');



    this.updateObject = function () {
        var speed = self.speed * Engine.game.delta;

        self.movingLeft = false;
        self.movingRight = false;

        if (Engine.inputs.isKeyPressed) {
            if (Engine.inputs.keyPressed[Engine.inputs.keyMap.LEFT]) {
                if ((self.position.x - speed) > 0)
                    self.position.x -= speed;
            }
            if (Engine.inputs.keyPressed[Engine.inputs.keyMap.RIGHT]) {
                if ((self.position.x + speed) < (Engine.context.boundaries.maxX - self.sprite.width)){}
                    self.position.x += speed;
            }

            if (Engine.inputs.keyPressed[Engine.inputs.keyMap.SPACEBAR]) {
                self.shotRate.do(function () {
                    Engine.audio.playSound("laserShot1");
                    new Projectile(self.position.x + (self.sprite.width / 2), self.position.y, 0.8, "top", "#85a5fa", ["enemy"]);
                });
            }

        }


        var collideBoxPosition =  {
                x: self.position.x + self.sprite.width/2,
                y: self.position.y +self.sprite.height/2
            };
        self.collideBox.update(collideBoxPosition, 20);

    };

    this.drawObject = function () {
        var ctx = Engine.context.get();
        ctx.shadowColor = "rgba(5,5,24, 0.3)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = self.position.x - (Engine.context.boundaries.maxX / 2);
        if(self.position.x > (Engine.context.boundaries.maxX / 2))
            ctx.shadowOffsetX = ctx.shadowOffsetX * -1;
        ctx.shadowOffsetY = 50;
        self.sprite.draw();
        ctx.shadowOffsetY = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowBlur = 0;
    }



}
