/**
 * core/core.context.js
 *
 * Context Manager
 * Manage the canvas context of the game
 *
 * @author Anicet REGLAT
 */

function Context(canvas) {
    var self = this;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.boundaries = {
        maxX: canvas.width,
        maxY: canvas.height
    };

    this.get = function () {
        return self.context;
    };

    this.save = function(){
        self.context.save();
    };

    this.restore = function(){
        self.context.restore();
    };


    this.clear = function (){
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
    };

    this.addSprite = function (sprite, x, y) {
        self.context.drawImage(sprite, x, y, sprite.width, sprite.height)
    };

    this.addRepeatableBackground = function (image, x, y) {
        self.context.drawImage(image, x, y - (image.height));
        self.context.drawImage(image, x, y);
    };

}
