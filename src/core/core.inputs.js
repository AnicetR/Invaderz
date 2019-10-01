/**
 * core/core.inputs.js
 *
 * Input Manager
 * Manage the keyboard inputs
 * TODO: decorrelate usages in two classes
 *
 * @author Anicet REGLAT
 */

var Inputs = function () {

    var self = this;

    this.keyMap = {
        "RIGHT": 39,
        "LEFT": 37,
        "SPACEBAR": 32
    };

    this.keyPressed = [];
    this.isKeyPressed = function () {
        for (var i = 0; i < self.keyPressed.length; i++)
            if (self.keyPressed[i] !== undefined)
                return true;
    };

    document.onkeydown = function (event) {
        self.keyPressed[event.keyCode] = true;
    };

    document.onkeyup = function (event) {
        delete self.keyPressed[event.keyCode];
    };


};
