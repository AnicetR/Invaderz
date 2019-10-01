/**
 * core/core.audio.js
 *
 * audioClip player
 * Manage audioclips library and play/pause
 *
 * @author Anicet REGLAT
 */

function mAudio(){
    var self = this;
    /**
     * @property {Array[audioClip]} audioClip Collection
     */
    this.audioClips = [];

    /**
     * audioClip constructor
     * @param src {string} audioclipe source
     */
    this.audioClip = function(src){
        var self = this;
        this.sound = new Audio(src);
        this.sound.preload = "auto";
        this.volume = 0.7;

        this.play = function(){
            var sound = self.sound.cloneNode();
            sound.volume = self.volume;
            sound.play();
        }
    };

    /**
     * Add an audioClip to the collection
     * @param name {string} Name of the clip
     * @param src {string} Source of the clip
     */
    this.registerAudioClip = function(name, src){
        self.audioClips[name] = new self.audioClip(src);
    };

    /**
     * Plays a sound
     * @param name {string} name of the clip in collection
     */
    this.playSound = function(name){
        self.audioClips[name].play();
    }
}
