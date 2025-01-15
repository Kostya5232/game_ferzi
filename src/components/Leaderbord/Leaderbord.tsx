import React from "react";
import { getLeaderboard, LeaderboardEntry, clearLeaderboard } from "../../leaderbord";
import "./Leaderboard.css";

interface LeaderboardProps {
    onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onClose }) => {
    const leaderboard: LeaderboardEntry[] = getLeaderboard();

    // const handleClear = () => {
    //     clearLeaderboard();
    //     window.location.reload();
    // };

    return (
        <div className="leaderboard">
            <h2>Таблица лидеров</h2>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Время (сек)</th>
                        <th>Ходы</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, indexK) => (
                        <tr key={indexK}>
                            <td>{indexK + 1}</td>
                            <td>{entry.nameK}</td>
                            <td>{entry.timeK}</td>
                            <td>{entry.movesK}</td>
                            <td>{new Date(entry.dateK).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={onClose}>Назад</button>
            {/* <button onClick={handleClear}>Очистить таблицу лидеров</button> */}
        </div>
    );
};

export default Leaderboard;
