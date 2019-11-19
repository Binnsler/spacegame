// Libraries
import Engine from "game/engine.js";

// Components
import PlayerShip from "game/components/PlayerShip.js";
import Enemy from "game/components/Enemy.js";
import Level from "game/components/Level.js";

// Data
import spriteData from "content/data/spriteData.json";
import enemyData from "content/data/enemyData.json";
import levelData from "content/data/levelData.json";

var Game = function Game( canvas, context ){
    var KEY_CODES = {
        37: "left",
        39: "right",
        38: "fire",
        32: "action"
    };

    this.initialize = () => {
        this.spriteSheet = new Engine.SpriteSheet;
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.boards = [];
        this.keys = {};

        if( !this.context ){
            alert( "You must update your browser before playing this game" );
        }

        this.setupInput( this );

        this.loop( this );

        this.startGame();
    };

    this.startGame = () => {
        this.spriteSheet.load(
            spriteData,
            () => {}
        );

        this.setBoard( 0, new Engine.StarField( this, 4, 0.4, 100, true ) );
        this.setBoard( 1, new Engine.StarField( this, 8, 0.6, 100 ) );
        this.setBoard( 2, new Engine.StarField( this, 16, 1.0, 25 ) );
        this.setBoard( 3, new Engine.TitleScreen( this, "The Final Frontier", "Press spacebar to start playing!", this.playGame ) );
    };


    //////
    // Handle Input
    //////
    this.setupInput = ( game ) => {
        window.addEventListener( "keydown", function keydown( e ){
            if( KEY_CODES[e.keyCode] ){
                game.keys[KEY_CODES[e.keyCode]] = true;
                e.preventDefault();
            }
        }, false );

        window.addEventListener( "keyup", function keydown( e ){
            if( KEY_CODES[e.keyCode] ){
                game.keys[KEY_CODES[e.keyCode]] = false;
                e.preventDefault();
            }
        }, false );
    };


    //////
    // Game Loop
    //////
    this.loop = ( game ) => {
        var dt = 30/1000;

        for( var i = 0; i < this.boards.length; i++ ){
            if( this.boards[i] ){
                this.boards[i].step( dt );
                this.boards[i] && this.boards[i].draw( game.context );
            }
        };

        setTimeout( () => this.loop( game ), 30 );
    };

    this.setBoard = ( num, board ) => {
        this.boards[num] = board;
    };

    this.playGame = () => {
        var board = new Engine.GameBoard();

        board.add( new PlayerShip( this, this.spriteSheet ) );
        board.add( new Level( this, this.spriteSheet, levelData.level1, this.winGame ) );

        this.setBoard( 3, board );
    };

    this.winGame = () => {
        this.setBoard( 3, new Engine.TitleScreen( this, "You Win!", "Press spacebar to play again", this.playGame ) );
    };

    this.loseGame = () => {
        this.setBoard( 3, new Engine.TitleScreen( this, "You Lose!", "Press spacebar to play again", this.playGame ) );
    };
};

export default Game;
