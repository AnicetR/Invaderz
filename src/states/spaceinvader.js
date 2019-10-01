/**
 * states/spaceinvader.js
 *
 * create the state of the game
 *
 * @constructor create the lifebar
 *
 * @author Anicet REGLAT
 */

    var BackgroundBack = new BackgroundBack();

    new Spaceship();
    var lifeBar = new Lifebar();
    var score = new Scorebar();


    var enemyLines = 5;
    var enemyNumberPerLine = 8;
    var enemyOffsetPerLine = 5;
    var enemyLineMargin = 100;
    var rowPadding = 75;
    var minLeft = 50;
    var mintop = 50;

    var SpaceInvader = new function(){
        var self = this;

        this.level = 0;
        this.enemy_count = 0;
        this.score = 0;

        this.do_level =  function(){
            this.level++;
            for(var line = 1; line < enemyLines; line++){
                for(var row = 0; row < enemyNumberPerLine; row++){
                    var x = minLeft + rowPadding * row + enemyOffsetPerLine;
                    var y = enemyLineMargin * (line-1) + mintop;
                    var type = 4;
                    if(line <= 3)
                        type = line;
                    new Enemy(type, x, y);
                    self.enemy_count++;
                }
            }
        };

        this.init = function(){
            this.do_level();
        };

        this.enemy_died = function(type){
            self.enemy_count--;
            if(self.enemy_count === 0){
                self.do_level();
            }
            switch(type){
                case 1:
                    self.score += 100 * self.level;
                    break;
                case 2:
                    self.score += 30 * self.level;
                    break;
                case 3:
                case 4:
                    self.score += 10 * self.level;
                    break;
            }
            self.score += 100*type;
        };

        this.gameOver = function(){
            Engine.game.deleteAllObjectsInList();
            new GameOver();
        }
    };

    SpaceInvader.init();
