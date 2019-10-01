/**
 * core/debugtools/objectCount.js
 *
 * shows how many objects are loaded on screen
 *
 * @author Anicet REGLAT
 */

function ObjectCount(x, y){

    var self = this;

    this.position = {
        x: x,
        y: y
    };

    this.context = Engine.context.get();

    this.lineMargin = 15;

    this.toShow = [
        "Engine.game.level.object",
        "Engine.game.level.background",
        "Engine.collisions.collideBoxes"
    ];


    this.drawLine = function(text, position){
        self.context.font = "14px Arial";

        self.context.strokeStyle = "#020d26";
        self.context.lineWidth = 3;

        self.context.strokeText(text, position.x, position.y);
        self.context.fillStyle = "#56ffe7";
        self.context.fillText(text, position.x, position.y);
    };

    this.draw = function(){
        for(var i = 0; i < self.toShow.length; i++){
            var count = eval(self.toShow[i]+"List").length;
            self.drawLine(self.toShow[i]+" : "+count, {x: self.position.x, y:self.position.y+(self.lineMargin * i)});
        }
    }

}
