export type Position = { row: number; col: number };

export const isUnderAttack = (queens: Position[], row: number, col: number): boolean => {
    return queens.some((q) => q.row === row || q.col === col || Math.abs(q.row - row) === Math.abs(q.col - col));
};
