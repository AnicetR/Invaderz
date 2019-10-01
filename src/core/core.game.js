/**
 * core/core.game.js
 *
 * Event Bus Manager
 * Manage the game graphic engine & game state
 * TODO: decorrelate usages in two classes
 *
 * @author Anicet REGLAT
 */

function Game() {


    var self = this;

    this.maxFPS = 60;
    this.timeStep = 1000 / (self.maxFPS * 2);
    this.delta = 0;
    this.lastRender = 0;

    this.level = {"objectList": [], "backgroundList": [], "debugObjectList": []};

    this.appendObjectList = function (gameObject) {
        gameObject.ref = Engine.genUUID();
        self.level.objectList.push(gameObject);
        return gameObject.ref;
    };

    this.deleteObjectInList = function (ref) {
        for (var i = 0; i < self.level.objectList.length; i++) {
            if (ref === self.level.objectList[i].ref) {
                self.level.objectList.splice(i, 1);
                break;
            }
        }
    };

    this.deleteAllObjectsInList = function(){
        self.level.objectList = [];
    };

    this.appendBackgroundList = function (gameObject) {
        gameObject.ref = Engine.genUUID();
        self.level.backgroundList.push(gameObject);
        self.level.backgroundList.sort(function(a, b){
            return a.layer - b.layer;
        });
        return gameObject.ref;
    };

    this.deleteBackgroundList = function (ref) {
        for (var i = 0; i < self.level.backgroundList.length; i++) {
            if (ref === self.level.backgroundList[i].ref) {
                self.level.backgroundList.splice(i, 1);
                break;
            }
        }
    };

    this.appendDebugObjectList = function (gameObject) {
        gameObject.ref = Engine.genUUID();
        self.level.debugObjectList.push(gameObject);
        return gameObject.ref;
    };

    this.deleteDebugObjectList = function (ref) {
        for (var i = 0; i < self.level.debugObjectList.length; i++) {
            if (ref === self.level.debugObjectList[i].ref) {
                self.level.debugObjectList.splice(i, 1);
                break;
            }
        }
    };


    this.launch = function () {
        Engine.context.save();
        window.requestAnimationFrame(self.loop);
    };

    this.update = function () {
        for (var i = 0; i < this.level.backgroundList.length; i++) {
            self.level.backgroundList[i].updateObject();
        }
        for (var i = 0; i < this.level.objectList.length; i++) {
            self.level.objectList[i].updateObject();
        }
    };

    this.drawBG = function () {
        for (var i = 0; i < self.level.backgroundList.length; i++) {
            Engine.context.save();
            self.level.backgroundList[i].drawObject();
            Engine.context.restore();
        }

    };

    this.draw = function () {
        for (var i = 0; i < self.level.objectList.length; i++) {
            Engine.context.save();
            self.level.objectList[i].drawObject();
            Engine.context.restore();
        }

    };

    this.drawDebug = function () {
        for (var i = 0; i < this.level.debugObjectList.length; i++) {
            if (self.level.debugObjectList[i].draw !== undefined) {
                Engine.context.save();
                self.level.debugObjectList[i].draw();
                Engine.context.restore();
            }
        }
    };

    this.drawDebugTools = function(timestamp){
        Engine.context.save();
            Engine.context.get().globalAlpha = Engine.debugTools.opacity;
            var fps = 1000 / (self.lastRender - timestamp);
            Engine.debugTools.fpsGraph.update(fps);
            Engine.debugTools.fpsGraph.draw();
            Engine.debugTools.objectCount.draw();
        Engine.context.restore();
    };

    this.loop = function (timestamp) {
       if (timestamp < (self.lastRender + self.timeStep)) {
            requestAnimationFrame(Engine.game.loop);
            return;
        }
        var frameTime = timestamp - self.lastRender;
        //
        while (frameTime > 0) {
            self.delta = Math.min(self.timeStep, frameTime);
            Engine.game.update();
            frameTime -= self.delta;
        }

        Engine.collisions.detectCollisions();

        Engine.context.clear();

        self.drawBG();
        self.draw();
        if (Engine.debug) {
            self.drawDebug(timestamp);
            self.drawDebugTools(timestamp);
        }
        self.lastRender = timestamp;
        window.requestAnimationFrame(Engine.game.loop);
    };
}
