const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
let scores = { X: 0, O: 0 };

function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.textContent = board[row][col];
            if (board[row][col] === '') {
                cell.addEventListener('click', handleClick);
            } else {
                cell.classList.add('taken');
            }
            boardElement.appendChild(cell);
        }
    }
}

function handleClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (board[row][col] !== '') return;

    board[row][col] = currentPlayer;
    updateBoard();

    if (checkWin(currentPlayer)) {
        scores[currentPlayer]++;
        updateScore();
        messageElement.textContent = currentPlayer + " a gagné !";
        disableBoard();
        return;
    } else if (checkDraw()) {
        messageElement.textContent = "Match nul !";
        return;
    }

    currentPlayer = 'O';
    setTimeout(aiMove, 500);
}

function aiMove() {
    const emptyCells = [];
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] === '') emptyCells.push([r, c]);
        }
    }

    if (emptyCells.length === 0) return;

    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[row][col] = 'O';
    updateBoard();

    if (checkWin('O')) {
        scores['O']++;
        updateScore();
        messageElement.textContent = "O a gagné !";
        disableBoard();
        return;
    } else if (checkDraw()) {
        messageElement.textContent = "Match nul !";
        return;
    }

    currentPlayer = 'X';
}

function updateBoard() {
    createBoard();
}

function updateScore() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleClick));
}

function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    return false;
}

function checkDraw() {
    return board.flat().every(cell => cell !== '');
}

function resetGame() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    currentPlayer = 'X';
    messageElement.textContent = '';
    createBoard();
}

createBoard();
