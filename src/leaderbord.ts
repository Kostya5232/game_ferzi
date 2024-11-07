export type LeaderboardEntry = {
    name: string;
    time: number;
    moves: number;
    date: string;
};

export const getLeaderboard = (): LeaderboardEntry[] => {
    const data = localStorage.getItem("leaderboard");
    return data ? JSON.parse(data) : [];
};

export const saveToLeaderboard = (time: number, moves: number, name: string) => {
    const newEntry: LeaderboardEntry = {
        name,
        time,
        moves,
        date: new Date().toISOString(),
    };

    const leaderboard = getLeaderboard();
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => a.time - b.time || a.moves - b.moves);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 10)));
};

export const clearLeaderboard = () => {
    localStorage.removeItem("leaderboard");
};
