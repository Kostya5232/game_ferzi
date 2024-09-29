import React from "react";
import "./Cell.css";

interface CellProps {
    isQueen: boolean;
    isUnderAttack: boolean;
    onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ isQueen, isUnderAttack, onClick }) => {
    const cellClass = `cell ${isQueen ? "queen" : ""} ${isUnderAttack ? "under-attack" : ""}`;

    return (
        <div className={cellClass} onClick={onClick}>
            {isQueen && "♕"}
        </div>
    );
};

export default Cell;
