export const ROWS = 6;
export const COLS = 7;

export const getAvailableRow = (board, colIndex) => {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][colIndex]) return row;
  }
  return -1;
};

export const checkWin = (board, row, col, player) => {
  const directions = [
    { dr: 0, dc: 1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }, { dr: 1, dc: -1 }
  ];

  const countInDirection = (r, c, dr, dc) => {
    let count = 0;
    let currR = r + dr;
    let currC = c + dc;
    while (currR >= 0 && currR < ROWS && currC >= 0 && currC < COLS && board[currR][currC] === player) {
      count++;
      currR += dr;
      currC += dc;
    }
    return count;
  };

  for (const { dr, dc } of directions) {
    const total = 1 + countInDirection(row, col, dr, dc) + countInDirection(row, col, -dr, -dc);
    if (total >= 4) return true;
  }
  return false;
};