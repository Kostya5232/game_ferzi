export type LeaderboardEntry = {
    nameK: string;
    timeK: number;
    movesK: number;
    dateK: string;
};

export const getLeaderboard = (): LeaderboardEntry[] => {
    const data = localStorage.getItem("leaderboardK");
    return data ? JSON.parse(data) : [];
};

export const saveToLeaderboard = (timeK: number, movesK: number, nameK: string) => {
    const newEntry: LeaderboardEntry = {
        nameK,
        timeK,
        movesK,
        dateK: new Date().toISOString(),
    };

    const leaderboard = getLeaderboard();
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => a.timeK - b.timeK || a.movesK - b.movesK);
    localStorage.setItem("leaderboardK", JSON.stringify(leaderboard.slice(0, 10)));
};

export const clearLeaderboard = () => {
    localStorage.removeItem("leaderboardK");
};
