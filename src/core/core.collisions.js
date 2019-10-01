/**
 * core/core.collisions.js
 *
 * Collisions Manager
 * Manage the collisions inside the engine
 *
 * Not todly working
 *
 * @author Anicet REGLAT
 */

function Collisions(){
    var self = this;
    this.collideBoxesList = [];

    this.registerCollideBox = function(collideBox){
        collideBox.ref = Engine.genUUID();
        self.collideBoxesList.push(collideBox);
        return collideBox.ref;
    };

    this.removeCollideBox = function(ref){
        for(var i = 0; i < self.collideBoxesList.length; i++){
            if(ref === self.collideBoxesList[i].ref) {
                self.collideBoxesList.splice(i, 1);
                break;
            }
        }
    };

    this.detectCollisions = function(){
        for(var i = 0; i < self.collideBoxesList.length; i++){
            var collideBox1 = self.collideBoxesList[i];
            for(var j = i+1; j < self.collideBoxesList.length; j++){
                var collideBox2 = self.collideBoxesList[j];

                if(typeof collideBox1.dim === typeof  collideBox2.dim === Object){
                    self.detectRectCollision(collideBox1, collideBox2);
                }
                else if(typeof collideBox1.dim !== typeof collideBox2.dim){

                    if(typeof collideBox1.dim === Object){
                        self.detectRectCircleCollision(collideBox1, collideBox2);
                        break;
                    }
                    self.detectRectCircleCollision(collideBox2, collideBox1)
                }
                else
                    self.detectCircleCollision(collideBox1, collideBox2);
            }
        }
    };

    this.detectCircleCollision = function(circle1, circle2){
        var dx = circle1.position.x - circle2.position.x;
        var dy = circle1.position.y - circle2.position.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circle1.dim + circle2.dim) {
            self.sendCollide(circle1, circle2);
        }
    };

    this.detectRectCollision = function(rect1, rect2){
        if (rect1.position.x < rect2.position.x + rect2.dim.x &&
            rect1.position.x + rect1.dim.x > rect2.position.x &&
            rect1.position.y < rect2.position.y + rect2.dim.y &&
            rect1.dim.y + rect1.position.y > rect2.position.y) {

            self.sendCollide(rect1, rect2);
        }
    };

    // TODO : Not working
    this.detectRectCircleCollision = function(rect, circle){
        var nearestX = Math.max(rect.position.x, Math.min(rect.position.x + rect.dim.x));
        var nearestY = Math.max(rect.position.y, Math.min(rect.position.y + rect.dim.y));

        var DeltaX = circle.position.x - nearestX;
        var DeltaY = circle.position.y - nearestY;

        if((DeltaX * DeltaX + DeltaY * DeltaY) < (circle.dim * circle.dim))
            console.log('test');

    };

    this.sendCollide = function(collideBox1, collideBox2){
        for(var i = 0; i < collideBox1.collideWith.length; i++){
            for(var j = 0; j < collideBox2.collideWith.length; j++){
                if(collideBox1.collideWith[i] === collideBox2.name || collideBox2.collideWith[j] === collideBox1.name){
                    collideBox1.onCollide();
                    collideBox2.onCollide();
                    break;
                }
            }
        }

    };
}
