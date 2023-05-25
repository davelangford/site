function solveSudoku(puzzle) {
    // Convert the string into a 2D array representation
    const board = puzzle.split('').map(Number);

    // Helper function to check if a number can be placed in a specific cell
    function isValid(board, row, col, num) {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (board[row * 9 + i] === num) {
                return false;
            }
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i * 9 + col] === num) {
                return false;
            }
        }

        // Check 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[(startRow + i) * 9 + startCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    // Recursive backtracking function to solve the puzzle
    function solve(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row * 9 + col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row * 9 + col] = num;
                            if (solve(board)) {
                                return true;
                            }
                            board[row * 9 + col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    // Solve the puzzle
    solve(board);

    // Convert the 2D array back to string representation
    const solution = board.join('');
    return solution;
}