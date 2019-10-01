/**
 * core/core.inputs.js
 *
 * Engine Manager
 * Manage the Engine, makes everything work together
 *
 * @author Anicet REGLAT
 */

var Engine = {};
var canvas = document.getElementById("scene");

(function Main(){
    Engine.context = new Context(canvas);
    Engine.game = new Game();
    Engine.collisions = new Collisions();
    Engine.events = new Events();
    Engine.game.launch();
    Engine.inputs = new Inputs();
    Engine.audio = new mAudio();

    Engine.utils = {};
    Engine.utils.collideBox = CollideBox;
    Engine.utils.rate = Rate;

    Engine.debug = false;

    Engine.debugTools = {};
    Engine.debugTools.opacity = 0.5;
    Engine.debugTools.fpsGraph = new FpsViewer(630,720,Engine.game.maxFPS);
    Engine.debugTools.ObjectCount = new ObjectCount(400,740);

    //RFC4122 uuid gen
    Engine.genUUID = function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
})();
