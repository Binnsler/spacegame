var Engine = {
    "SpriteSheet": function SpriteSheet(){
        this.sprites = {};

        this.load = ( spritesData, callback ) => {
            this.sprites = spritesData;
            this.image = new Image();
            this.image.onload = callback;
            this.image.src = "/src/content/images/sprites.png";
        };

        this.draw = ( ctx, spriteName, drawX, drawY, frame ) => {
            var sprite = this.sprites[spriteName];

            if( !frame ){
                frame = 0;
            }

            ctx.drawImage(
                this.image,
                sprite.sx + frame * sprite.w,
                sprite.sy,
                sprite.w,
                sprite.h,
                drawX,
                drawY,
                sprite.w,
                sprite.h
            );
        };
    },

    "StarField": function StarField( Game, speed, opacity, numStars, clear ){
        // Setup offscreen canvas
        var stars = document.createElement( "canvas" );
        var starsCxt;
        var offset = 0;

        stars.width = Game.width;
        stars.height = Game.height;

        starsCxt = stars.getContext( "2d" );

        // If the clear option is set,
        // make the background black instead of transparent
        if( clear ){
            starsCxt.fillStyle = "#000000";
            starsCxt.fillRect( 0, 0, stars.width, stars.height );
        }

        // Draw random 2px white squares all over canvas
        starsCxt.fillStyle = "#FFFFFF";
        starsCxt.globalAlpha = "opacity";

        for( var i = 0; i < numStars; i++ ){
            starsCxt.fillRect(
                Math.floor( Math.random() * stars.width ),
                Math.floor( Math.random() * stars.height ),
                2,
                2
            );
        }

        // This function is called every frame to draw the starfield onto the main canvas
        this.draw = ( context ) => {
            var intOffset = Math.floor( offset );
            var remaining = stars.height - intOffset;

            // Draw the top half of the starfield
            if( intOffset > 0 ){
                context.drawImage(
                    stars,
                    0,
                    remaining,
                    stars.width,
                    intOffset,
                    0,
                    0,
                    stars.width,
                    intOffset
                );
            }

            // Draw the bottom half of the starfield
            if( remaining > 0 ){
                context.drawImage(
                    stars,
                    0,
                    0,
                    stars.width,
                    remaining,
                    0,
                    intOffset,
                    stars.width,
                    remaining
                );
            }
        };

        // This method updates the starfield
        this.step = ( dt ) => {
            offset += dt * speed;
            offset = offset % stars.height;
        };
    },

    "TitleScreen": function TitleScreen( Game, title, subtitle, callback ){
        this.step = ( dt ) => {
            if( Game.keys["action"] && callback ){
                callback();
            }
        };

        this.draw = ( cxt ) => {
            cxt.fillStyle = "#FFFFFF";
            cxt.textAlign = "center";

            cxt.font = "40px bangers";
            cxt.fillText( title, Game.width/2, Game.height/2 );

            cxt.font = "20px bangers";
            cxt.fillText( subtitle, Game.width/2, Game.height/2 + 40 );
        }
    },

    "GameBoard": function GameBoard(){
        var board = this;

        this.objects = [];
        this.cnt = [];

        this.add = ( obj ) => {
            obj.board = this;
            this.objects.push( obj );
            this.cnt[obj.type] = ( this.cnt[obj.type] || 0 ) + 1;

            return obj;
        };

        this.remove = ( obj ) => this.removed.push( obj );

        this.resetRemoved = () => this.removed = [];

        this.finalizeRemoved = () => {
            for( var i = 0; i < this.removed.length; i++ ){
                var index = this.objects.indexOf( this.removed[i] );

                if( index != -1 ){
                    this.objects.splice( index, 1 );
                }
            }
        };

        // Iterate over all objects and call the given method
        this.iterate = function iterate( method ){
            var args = Array.prototype.slice.call( arguments, 1 );

            for( var i = 0; i < this.objects.length; i++ ){
                var obj = this.objects[i];

                obj[method].apply( obj, args );
            }
        };

        // Find the first object for which func returns true
        this.detect = ( func ) => {
            for( var i = 0; i < this.objects.length; i++ ){
                if( func.call( this.objects[i] ) ){
                    return this.objects[i];
                }
            }

            return false;
        };

        // Call step on all objects and then delete any object marked ready for removal
        this.step = ( dt ) => {
            this.resetRemoved();
            this.iterate( "step", dt );
            this.finalizeRemoved();
        };

        this.draw = ( cxt ) => this.iterate( "draw", cxt )

        // Check edges to see if possible to overlap. Notice !bang operator to negate
        this.overlap = ( obj1, obj2 ) => {
            return !(
                ( obj1.y + obj1.h - 1 < obj2.y ) ||
                ( obj1.y > obj2.y + obj2.h - 1 ) ||
                ( obj1.x + obj1.w - 1 < obj2.x ) ||
                ( obj1.x > obj2.x + obj2.w - 1 )
            );
        };

        // Check for collision, returning obj ( true ) or false
        this.collide = ( obj, type ) => {
            return this.detect(
                function(){
                    if( obj != this ){
                        var col = ( !type || this.type & type ) && board.overlap( obj, this );

                        return col ? this : false;
                    }
                }
            );
        };
    }
};


export default Engine;
