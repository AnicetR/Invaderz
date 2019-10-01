/**
 * core/utils/utils.collidebox.js
 *
 * manage the collideBox of a gameObject
 *
 * @author Anicet REGLAT
 */

var CollideBox = function(positionRef, dimRef, name, collideWith, collideCB){

    var self = this;

    this.position = {x: positionRef.x, y: positionRef.y};

    this.dim = (typeof dimRef === Object) ? {x:dimRef.x, y:dimRef.y} : dimRef;

    this.name = name;
    this.collideWith = collideWith; //array of names or null for all collideTypes

    this.EventBus = new Events();
    this.subscribeIndex = 0;

    this.collideCB = collideCB;

    this.onCollide = function(){
        self.collideCB();
    };

    this.destroy = function() {
        Engine.collisions.removeCollideBox(self.ref);
        if(Engine.debug)
            Engine.game.deleteDebugObjectList(self.ref);
        self = null;
    };

    this.init = function(){
        Engine.collisions.registerCollideBox(self);
        if(Engine.debug){
            Engine.game.appendDebugObjectList(self);
        }
    };

    this.update = function(newPosition, newDim){
        self.position = newPosition;
        self.dim = newDim;
    };

    this.draw = function(){
        var ctx = Engine.context.get();
        ctx.strokeStyle = "rgba(0,0,255,0.5)";
        ctx.fillStyle = "rgba(0,255,0,0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        if(typeof self.dim === "object"){
            ctx.rect(self.position.x,self.position.y,self.dim.x,self.dim.y);
        }
        else{
            ctx.arc(self.position.x, self.position.y, self.dim, 0, 2*Math.PI, true);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

};
