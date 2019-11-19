// Components
import Sprite from "game/components/Sprite.js";
import Explosion from "game/components/Explosion.js";

// Data
import objectTypes from "content/data/objectTypes.json";

var Enemy = function enemyShip( Game, SpriteSheet, blueprint, override ){
    var baseParameters = {
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0,
        "E": 0,
        "F": 0,
        "G": 0,
        "H": 0,
        "t": 0,
        "game": {
            "height": Game.height,
            "width": Game.width
        }
    };

    this.merge( baseParameters );
    this.setup( SpriteSheet, blueprint.sprite, blueprint );
    this.merge( override );
};

Enemy.prototype = new Sprite();

Enemy.prototype.type = objectTypes.enemy;

Enemy.prototype.step = function step( dt ){
    var collision = this.board.collide( this, objectTypes.player );

    this.t += dt;
    this.vx = this.A + this.B * Math.sin( this.C * this.t + this.D );
    this.vy = this.E + this.F * Math.sin( this.G * this.t + this.H );
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if( collision ){
        collision.hit( this.damage );
        this.board.remove( this );
    }

    if(
        this.y > this.game.height ||
        this.x < -this.w ||
        this.x > this.game.width
    ){
        this.board.remove( this );
    }
};

Enemy.prototype.hit = function( damage ){
    this.health -= damage;

    if( this.health <=0 ){
        if( this.board.remove(this) ){
            this.board.add(
                new Explosion( this.spriteSheet, this.x + this.w/2, this.y + this.h/2 )
            );
        }
    }
}

export default Enemy;
