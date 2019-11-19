// Components
import PlayerShip from "game/components/PlayerShip.js";
import Enemy from "game/components/Enemy.js";

// Data
import enemyData from "content/data/enemyData.json";
import objectTypes from "content/data/objectTypes.json";

var Level = function level( Game, SpriteSheet, levelData, callback ){
    this.t = 0;
    this.callback = callback;
    this.levelData = [];
    this.game = Game;
    this.spriteSheet = SpriteSheet;

    for( var i = 0; i < levelData.length; i++ ){
        this.levelData.push( Object.create( levelData[i] ) );
    }
};

Level.prototype.step = function step( dt ){
    var idx = 0;
    var remove = [];
    var curShip = null;

    // Update the current time offset
    this.t += dt * 1000;

    while( ( curShip = this.levelData[idx] ) && ( curShip[0] < this.t + 2000) ){
        // Check if past the end time
        if( this.t > curShip[1] ){
            // If so, remove entry
            remove.push( curShip )
        }
        else if( curShip[0] < this.t ){
            // Get the enemy definition blueprint
            var enemy = enemyData[curShip[3]];
            var override = curShip[4];

            // Add a new enemy with the blueprint and override
            this.board.add( new Enemy( this.game, this.spriteSheet, enemy, override ) );

            // Increment the start time by the gap
            curShip[0] += curShip[2];
        }

        idx++;
    }

    // Remove any objects from the levelData that have passed
    for( var i = 0; i < remove.length; i++ ){
        var idx = this.levelData.indexOf( remove[i] );

        if( idx != -1 ){
            this.levelData.splice( idx, 1 );
        }
    }

    // If there are no more enemies on the board or in levelData, this level is done
    if( this.levelData.length == 0 && this.board.cnt[objectTypes.enemy] == 0 ){
        if( this.callback ){
            this.callback();
        }
    }
};

// Dummy method, doesn't draw anything
Level.prototype.draw = function draw(){}

export default Level;
