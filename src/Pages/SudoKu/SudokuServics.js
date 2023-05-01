export const generateRandomSudoku = () => {
  const emptyBoard = [...Array(9)].map(() => Array(9).fill(""));
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // randomly fill in the first row
  const firstRow = shuffleArray(values);
  for (let i = 0; i < 9; i++) {
    emptyBoard[0][i] = firstRow[i];
  }

  // fill in the rest of the board
  solveSudoku(emptyBoard); // solve the empty board
  const numToRemove = Math.floor(Math.random() * 40) + 20; // remove between 20 and 60 numbers
  let removedCount = 0;
  while (removedCount < numToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (emptyBoard[row][col] !== "") {
      emptyBoard[row][col] = "";
      removedCount++;
    }
  }

  return emptyBoard;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function solveSudoku(board) {
  // Find the first empty cell in the board
  const emptyCell = findEmptyCell(board);

  // If there are no empty cells, the board is solved
  if (emptyCell === null) {
    return true;
  }

  const [row, col] = emptyCell;

  // Try each number from 1 to 9 in the empty cell
  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      // If the number is valid, set it in the cell
      board[row][col] = num;

      // Recursively solve the board with the new number set
      if (solveSudoku(board)) {
        return true;
      }

      // If the board cannot be solved with the current number, backtrack and try the next number
      board[row][col] = "";
    }
  }

  // If no number worked, the board cannot be solved
  return false;
}

function findEmptyCell(board) {
  // Find the first empty cell in the board
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === "") {
        return [row, col];
      }
    }
  }

  // If no empty cell was found, return null
  return null;
}

function isValid(board, row, col, num) {
  // Check if the number is valid in the row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }

  // Check if the number is valid in the column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  // Check if the number is valid in the 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  // If the number is valid in all respects, return true
  return true;
}

console.log(generateRandomSudoku());
