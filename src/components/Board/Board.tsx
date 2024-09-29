import React, { useState, useEffect } from "react";
import "./Board.css";
import Cell from "../Call/Cell";
import { isUnderAttack, Position } from "../../utils";

interface BoardProps {
    time: number;
    moves: number;
    setMoves: (moves: number) => void;
    resetTime: () => void;
}

const Board: React.FC<BoardProps> = ({ time, moves, setMoves, resetTime }) => {
    const [queens, setQueens] = useState<Position[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    const resetGame = () => {
        const randomQueen = { row: Math.floor(Math.random() * 8), col: Math.floor(Math.random() * 8) };
        setQueens([randomQueen]);
        setMoves(0);
        setGameOver(false);
        setGameWon(false);
        resetTime();
    };

    useEffect(() => {
        resetGame();
    }, []);

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
            }
        } else {
            setGameOver(true);
        }
    };

    const renderBoard = () => {
        const board = [];
        for (let row = 0; row < 8; row++) {
            const rowCells = [];
            for (let col = 0; col < 8; col++) {
                const isQueen = queens.some((q) => q.row === row && q.col === col);
                const underAttack = isUnderAttack(queens, row, col);
                rowCells.push(<Cell key={`${row}-${col}`} isQueen={isQueen} isUnderAttack={underAttack && !isQueen} onClick={() => handleCellClick(row, col)} />);
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
        <div>
            {gameWon ? (
                <div className="victory-screen">
                    <div className="confetti"></div> {/* Элемент для фона конфетти */}
                    <h1>Победа!</h1>
                    <p>Время: {time} секунд</p>
                    <p>Ходов: {moves}</p>
                </div>
            ) : gameOver ? (
                <div className="defeat-screen">Поражение! Один из ферзей под боем.</div>
            ) : (
                <div className="board">{renderBoard()}</div>
            )}

            <div className="resetButton">
                <button onClick={resetGame}>Начать заново</button>
            </div>
        </div>
    );
};

export default Board;
