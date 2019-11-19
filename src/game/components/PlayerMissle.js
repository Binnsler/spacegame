// Components
import Sprite from "game/components/Sprite.js";

// Data
import objectTypes from "content/data/objectTypes.json"

var PlayerMissle = function PlayerMissle( Game, SpriteSheet, x, y ){
    this.setup(
        SpriteSheet,
        "missle",
        {
            "vy": -700,
            "damage": 10
        }
    );

    // Center the missle on x
    this.x = x - this.w/2;

    // Use the passed in y as the bottom of the missle
    this.y = y - this.h;
};

PlayerMissle.prototype = new Sprite();

PlayerMissle.prototype.type = objectTypes.playerProjectile;

PlayerMissle.prototype.step = function step( dt ){
    var collision = this.board.collide( this, objectTypes.enemy );

    this.y += this.vy * dt;

    if( this.y < -this.h ){
        this.board.remove( this );
    }

    if( collision ){
        collision.hit( this.damage );
        this.board.remove( this );
    }
    else if( this.y < -this.h ){
        this.board.remove( this );
    }
};

export default PlayerMissle;
