import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";

const App: React.FC = () => {
    const [time, setTime] = useState(0);
    const [moves, setMoves] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const resetTime = () => {
        setTime(0);
    };

    const startGame = () => {
        setGameStarted(true);
        resetTime();
    };

    return (
        <div className="App">
            {gameStarted ? (
                <div className="game-screen">
                    <div className="game-content">
                        <Header time={time} moves={moves} />
                        <Board time={time} setMoves={setMoves} moves={moves} resetTime={resetTime} />
                    </div>
                </div>
            ) : (
                <div className="start-screen">
                    <h1>Игра "Ферзи"</h1>
                    <button onClick={startGame}>Начать игру</button>
                </div>
            )}
        </div>
    );
};

export default App;
