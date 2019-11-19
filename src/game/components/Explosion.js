// Components
import Sprite from "game/components/Sprite.js";

var Explosion = function( SpriteSheet, centerX,centerY ){
    this.setup( SpriteSheet, "explosion", { "frame": 0 } );

    this.x = centerX - this.w/2;
    this.y = centerY - this.h/2;
    this.subFrame = 0;
};

Explosion.prototype = new Sprite();

Explosion.prototype.step = function( dt ){
    this.frame++;
    if( this.frame >= 12 ){
        this.board.remove( this );
    }
};

export default Explosion;
