// Libraries
import React from "react";
import Game from "game/game.js";

class Home extends React.Component{
    componentDidMount(){
        this.startGame();
    }

    startGame(){
        const context = this.refs.canvas.getContext( "2d" );
        const game = new Game( this.refs.canvas, context );

        game.initialize();
    }

    render(){
        return (
            <div className="gameContainer">
                <canvas id="game" ref="canvas" width="320" height="480"></canvas>
            </div>
        );
    }
};

export default Home;
