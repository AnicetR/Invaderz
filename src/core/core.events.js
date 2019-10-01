/**
 * core/core.events.js
 *
 * Event Bus Manager
 * Manage the game engine event Bus
 *
 * @author Anicet REGLAT
 */

function Events(){
    var topics = [];
    var exists = topics.hasOwnProperty;
    return {
        subscribe : function(topic, listener){
            if(!exists.call(topics, topic))
                topics[topic] = [];
            return topics[topic].push(listener);
        },
        publish: function(topic, data){
            if(!exists.call(topics, topic))
                return;

            topics[topic].forEach(function(item) {
                item(data !== undefined ? data : {});
            });
        },
        unsubscribe: function(topic, index){
            topics[topic] = topics[topic].splice(index);
        }

    }
}
