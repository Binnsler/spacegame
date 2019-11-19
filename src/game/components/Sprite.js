var Sprite = function spritePrototype(){};

Sprite.prototype.setup = function setup( SpriteSheet, sprite, props ){
    this.spriteSheet = SpriteSheet;
    this.sprite = sprite;
    this.merge( props );

    this.frame = this.frame ? this.frame : 0;

    this.w = this.spriteSheet.sprites[this.sprite].w;
    this.h = this.spriteSheet.sprites[this.sprite].h;
};

Sprite.prototype.merge = function merge( props ){
    if( props ){
        for( var prop in props ){
            this[prop] = props[prop];
        }
    }
};

Sprite.prototype.draw = function draw( cxt ){
    this.spriteSheet.draw( cxt, this.sprite, this.x, this.y, this.frame );
};

Sprite.prototype.hit = function hit( damage ){
    this.board.remove( this );
};

export default Sprite;
