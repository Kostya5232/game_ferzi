import React from "react";
import "./Header.css";

interface HeaderProps {
    time: number;
    moves: number;
}

const Header: React.FC<HeaderProps> = ({ time, moves }) => {
    return (
        <div className="header">
            <div className="header-item time">
                ⏱ Время: <span>{time} секунд</span>
            </div>
            <div className="header-item moves">
                ♟ Ходы: <span>{moves}</span>
            </div>
        </div>
    );
};

export default Header;
