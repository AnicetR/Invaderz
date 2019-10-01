/**
 * core/debugtools/fpsViews.js
 *
 * shows frame per second graph
 *
 * @author Anicet REGLAT
 */

function FpsViewer(x, y, maxFps){

    var self = this;

    this.height = 90;
    this.width = 120;
    this.margin = 10;

    this.position = {
        x: x,
        y: y
    };

    this.maxFPS = maxFps;

    this.refreshRate = new Engine.utils.rate(100);

    this.context = Engine.context.get();

    this.colors = {
        bg: "rgb(0,0,0)",
        historyLine: {
            low: "rgba(255, 91, 44, 1)",
            medium: "rgba(215, 171, 44, 1)",
            maximum: "rgba(179, 255, 44, 1)"
        }
    };

    this.fpsHistoryLimit = 30;
    this.fpsHistory = [];
    this.graphMargin = 3;
    this.lastFps = 0;

    for( var i = 0; i < self.fpsHistoryLimit; i++){
        self.fpsHistory[i] = 0;
    }

    this.fpsColor = function (fps) {
        if(fps === 0)
             return "transparent";
        else if(fps >= (self.maxFPS - (self.maxFPS * 0.05)))
            return self.colors.historyLine.maximum;
        else if(fps >= (self.maxFPS - (self.maxFPS * 0.7)))
            return self.colors.historyLine.medium;
        else if(fps <= (self.maxFPS - (self.maxFPS * 0.4)))
            return self.colors.historyLine.low;
    };


    this.registerNewFPS = function(fps){
        fps = fps * -1;
        self.fpsHistory.splice(0,1);
        self.fpsHistory[self.fpsHistory.length] = fps;
        self.lastFps = fps;
    };

    this.drawBackground = function(){
        Engine.context.save();
        this.context.fillStyle = this.colors.bg;
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        Engine.context.restore();
    };


    this.drawFPS = function(){
        Engine.context.save();
        var fps = self.lastFps;
        fps = Math.round(fps * 1000)/1000;
        this.context.font = "13px Arial";
        this.context.fillStyle = self.fpsColor(fps);
        var position = {
            x: self.position.x,
            y: self.position.y +20
        };
        self.context.fillText(fps+" Fps", position.x, position.y);
        Engine.context.restore();
    };

    this.drawLine = function(index, fps){
        Engine.context.save();
        self.context.beginPath();
        self.context.strokeStyle = self.fpsColor(fps);
        self.context.strokeWidth = 1;
        self.context.moveTo(self.position.x + self.width - self.fpsHistoryLimit * (self.graphMargin + 1) + index + self.graphMargin * index, self.height + self.position.y);
        self.context.lineTo(self.position.x + self.width - self.fpsHistoryLimit * (self.graphMargin + 1) + index + self.graphMargin * index, self.height + self.position.y - fps);
        self.context.closePath();
        self.context.stroke();
        Engine.context.restore();
    };

    this.drawGraph = function(){
        for(var i = 0; i < self.fpsHistoryLimit; i++)
            self.drawLine(i, self.fpsHistory[i]);
    };

    this.draw = function(){
        self.drawBackground();
        self.drawFPS();
        self.drawGraph();
    };

    this.update = function(currentFps){
        self.refreshRate.do(function () {
            self.registerNewFPS(currentFps);
        });
    }

}
