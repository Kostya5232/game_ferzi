import React, { useState, useEffect } from "react";
import "./Board.css";
import Cell from "../Call/Cell";
import { isUnderAttack, Position } from "../../utils";
import { saveToLeaderboard } from "../../leaderbord";
import SoundPlayer from "../SoundPlayer";

interface BoardProps {
    time: number;
    moves: number;
    setMoves: (moves: number) => void;
    resetTime: () => void;
    gameEnded: (won: boolean) => void;
    onReset: () => void;
    onExit: () => void;
    openLeaderboard: () => void;
}

const Board: React.FC<BoardProps> = ({ time, moves, setMoves, resetTime, gameEnded, onReset, onExit, openLeaderboard }) => {
    const [queens, setQueens] = useState<Position[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [soundAction, setSoundAction] = useState<"queen" | "victory" | "defeat" | "background" | null>(null);

    const resetGame = () => {
        const randomQueen = { row: Math.floor(Math.random() * 8), col: Math.floor(Math.random() * 8) };
        setQueens([randomQueen]);
        setMoves(0);
        setGameOver(false);
        setGameWon(false);
        gameEnded(false);
        resetTime();
        onReset();
        setPlayerName("");
        setSoundAction("background");
    };

    useEffect(() => {
        resetGame();
    }, []);

    const handleExit = () => {
        onExit();
    };

    const handleCellClick = (row: number, col: number) => {
        if (gameOver || gameWon) return;

        const existingQueen = queens.find((q) => q.row === row && q.col === col);

        if (existingQueen) {
            setQueens(queens.filter((q) => q.row !== row || q.col !== col));
        } else if (!isUnderAttack(queens, row, col)) {
            setQueens([...queens, { row, col }]);
            setMoves(moves + 1);

            if (queens.length === 7) {
                setGameWon(true);
                gameEnded(true);
                setSoundAction("victory");
            }
        } else {
            setGameOver(true);
            gameEnded(false);
            setSoundAction("defeat");
        }
    };

    const renderBoard = () => {
        const board = [];
        for (let row = 0; row < 8; row++) {
            const rowCells = [];
            for (let col = 0; col < 8; col++) {
                const isQueen = queens.some((q) => q.row === row && q.col === col);
                const underAttack = isUnderAttack(queens, row, col);
                const isWhiteCell = (row + col) % 2 === 0;
                rowCells.push(
                    <Cell
                        key={`${row}-${col}`}
                        isQueen={isQueen}
                        isUnderAttack={underAttack && !isQueen}
                        onClick={() => handleCellClick(row, col)}
                        cellColor={isWhiteCell ? "white" : "black"}
                    />
                );
            }
            board.push(
                <div key={row} className="row">
                    {rowCells}
                </div>
            );
        }
        return board;
    };

    return (
        <div className="area">
            <SoundPlayer action={soundAction} />
            {gameWon ? (
                <div className="victory-screen">
                    <div className="confetti"></div>
                    <h1>Победа!</h1>
                    <p>Время: {time} секунд</p>
                    <p>Ходов: {moves}</p>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Введите ваше имя"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="buttons">
                        <button className="resetButton" onClick={resetGame}>
                            Начать заново
                        </button>
                        <button className="exitButtonEnd" onClick={handleExit}>
                            В меню
                        </button>
                        <button
                            className="leaderboardButton"
                            onClick={() => {
                                saveToLeaderboard(time, moves, playerName);
                                openLeaderboard();
                            }}
                            disabled={!playerName.trim()}
                        >
                            Сохранить результат
                        </button>
                    </div>
                </div>
            ) : gameOver ? (
                <div className="defeat-screen">
                    <h1>Поражение!</h1>
                    <h1>Один из ферзей под боем.</h1>
                    <h1>Попробуйте снова!</h1>
                    <div className="buttons">
                        <button className="resetButton" onClick={resetGame}>
                            Начать заново
                        </button>
                        <button className="exitButtonEnd" onClick={handleExit}>
                            В меню
                        </button>
                        <button className="leaderboardButton" onClick={openLeaderboard}>
                            Таблица лидеров
                        </button>
                    </div>
                </div>
            ) : (
                <div className="board">{renderBoard()}</div>
            )}

            {!gameWon && !gameOver && (
                <div className="exitButtonContainer">
                    <button className="exitButton" onClick={handleExit}>
                        В меню
                    </button>
                </div>
            )}
        </div>
    );
};

export default Board;
