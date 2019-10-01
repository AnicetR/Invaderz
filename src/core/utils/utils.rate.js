/**
 * core/utils/utils.rate.js
 *
 * manage when a new frame needs to be generated
 *
 * @author Anicet REGLAT
 */

var Rate = function(eachMs) {
    var self = this;
    this.lastExec = 0;

    this.do = function(callback){
        this.currentTime = Date.now();
        if (this.lastExec === undefined || (this.lastExec + eachMs) < this.currentTime) {
            callback();
            self.lastExec = Date.now();
        }
    }
};
