// Components
import Sprite from "game/components/Sprite.js";
import PlayerMissle from "game/components/PlayerMissle.js";

// Data
import objectTypes from "content/data/objectTypes.json"

var  PlayerShip = function PlayerShip( Game, SpriteSheet ){
    this.setup(
        SpriteSheet,
        "ship",
        {
            "vx": 0,
            "maxVel": 200,
            "reloadTime": 0.25,
            "frame": 0
        }
    );

    this.game = Game;

    this.x = Game.width/2 - this.w/2;
    this.y = Game.height - this.h - 10;
    this.reload = this.reloadTime;

    this.cxt = Game.context;

    this.step = ( dt ) => {
        if( Game.keys["left"] ){
            this.vx = -this.maxVel;
        }
        else if( Game.keys["right"] ){
            this.vx = this.maxVel;
        }
        else{
            this.vx = 0;
        }

        this.x += this.vx * dt;

        if( this.x < 0 ){
            this.x = 0;
        }
        else if( this.x > Game.width - this.w ){
            this.x = Game.width - this.w;
        }

        // Missle launch check
        this.reload -= dt;

        if( Game.keys["fire"] && this.reload < 0 ){
            Game.keys["fire"] = false;

            this.reload = this.reloadTime;

            this.board.add( new PlayerMissle( Game, this.spriteSheet, this.x, this.y + this.h/2 ) );
            this.board.add( new PlayerMissle( Game, this.spriteSheet, this.x + this.w, this.y + this.h/2 ) );
        }
    };
};

PlayerShip.prototype = new Sprite();

PlayerShip.prototype.type = objectTypes.player;

PlayerShip.prototype.hit = function( damage ){
    if( this.board.remove( this ) ){
        this.game.loseGame();
    }
}

export default PlayerShip;
