import React, { useEffect } from "react";
import "./Cell.css";

import queenSound from "../../assets/music/The_sound_of_running.mp3";
declare module "*.mp3";

interface CellProps {
    isQueen: boolean;
    isUnderAttack: boolean;
    onClick: () => void;
    cellColor: "white" | "black";
}

const Cell: React.FC<CellProps> = ({ isQueen, isUnderAttack, onClick, cellColor }) => {
    useEffect(() => {
        if (isQueen) {
            const audio = new Audio(queenSound);
            audio.play();
        }
    }, [isQueen]);

    const cellClass = `cell ${isQueen ? "queen" : ""} ${isUnderAttack ? "under-attack" : ""} ${cellColor}`;

    return (
        <div className={cellClass} onClick={onClick}>
            {isQueen && <video className="queen-video" src={require("../../assets/video/Queen.mp4")} autoPlay muted />}
        </div>
    );
};

export default Cell;
