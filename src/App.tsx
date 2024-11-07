import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import { saveToLeaderboard } from "./leaderbord";
import Leaderboard from "./components/Leaderbord/Leaderbord";

const App: React.FC = () => {
    const [time, setTime] = useState(0);
    const [moves, setMoves] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        if (!gameStarted || gameEnded) return;

        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted, gameEnded]);

    const resetTime = () => {
        setTime(0);
    };

    const startGame = () => {
        setGameStarted(true);
        setGameEnded(false);
        resetTime();
    };

    const openLeaderboard = () => {
        setShowLeaderboard(true);
    };

    const gameEnd = (won: boolean) => {
        setGameEnded(true);
        if (won && playerName) {
            saveToLeaderboard(time, moves, playerName);
        }
    };

    const exitToMenu = () => {
        setGameStarted(false);
        setGameEnded(false);
        setTime(0);
        setMoves(0);
        setPlayerName("");
    };

    const closeLeaderboard = () => {
        setShowLeaderboard(false);
    };

    return (
        <div className="App">
            {showLeaderboard ? (
                <Leaderboard onClose={closeLeaderboard} />
            ) : gameStarted ? (
                <div className="game-screen">
                    <div className="game-content">
                        <Header time={time} moves={moves} />
                        <Board
                            time={time}
                            setMoves={setMoves}
                            moves={moves}
                            resetTime={resetTime}
                            gameEnded={gameEnd}
                            onReset={() => setGameEnded(false)}
                            onExit={exitToMenu}
                            openLeaderboard={openLeaderboard}
                        />
                    </div>
                </div>
            ) : (
                <div className="start-screen">
                    <h1>Игра "Ферзи"</h1>
                    <p className="game-description">
                        Ваша задача — расставить всех ферзей на доске так, чтобы ни один из них не угрожал другому. Проверьте свои стратегические
                        навыки!
                    </p>
                    <div className="buttons">
                        <button onClick={startGame}>Начать игру</button>
                        <button onClick={openLeaderboard}>Посмотреть таблицу лидеров</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
