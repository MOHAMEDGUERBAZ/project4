document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const playerTurn = document.getElementById('player-turn');
    const restartBtn = document.getElementById('restart-btn');
    const title = document.getElementById('title');
    let currentPlayer = 'X';
    let gameOver = false;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        return null;
    }

    function checkTie() {
        return boardState.every(cell => cell !== '');
    }

    function handleClick(index) {
        if (gameOver || boardState[index] !== '') {
            return;
        }

        boardState[index] = currentPlayer;
        renderBoard();

        const winner = checkWinner();
        if (winner) {
            message.textContent = `Player ${winner} wins!`;
            message.classList.add('winner-message');
            gameOver = true;
        } else if (checkTie()) {
            message.textContent = "It's a tie!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerTurn.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function renderBoard() {
        board.innerHTML = '';
        boardState.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = value;
            cell.style.backgroundColor = value === 'X' ? '#FF0000' : (value === 'O' ? '#0000FF' : '');
            cell.addEventListener('click', () => handleClick(index));
            board.appendChild(cell);
        });
    }

    function restartGame() {
        currentPlayer = 'X';
        gameOver = false;
        boardState = ['', '', '', '', '', '', '', '', ''];
        message.textContent = '';
        message.classList.remove('winner-message');
        playerTurn.textContent = 'Player X\'s turn';
        renderBoard();
    }

    restartBtn.addEventListener('click', restartGame);

    renderBoard();
});
