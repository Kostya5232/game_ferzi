import React from "react";
import { getLeaderboard, LeaderboardEntry /*clearLeaderboard*/ } from "../../leaderbord";
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
                    {leaderboard.map((entry, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{entry.name}</td>
                            <td>{entry.time}</td>
                            <td>{entry.moves}</td>
                            <td>{new Date(entry.date).toLocaleDateString()}</td>
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
