export function setupTicTacToeGame() {
    const cells = Array(9).fill(null);
    let currentPlayer = 'X';
    let isGameActive = true;

    const gameBoard = document.getElementById('gameBoard');
    const gameStatus = document.getElementById('gameStatus');
    const restartButton = document.getElementById('restartButton');
    const returnLobbyButton = document.getElementById('returnLobbyButton');

    function setupGame() {
        gameBoard.innerHTML = '';
        cells.fill(null);
        currentPlayer = 'X';
        isGameActive = true;
        gameStatus.textContent = `User's turn`;
        restartButton.style.display = 'none';
        returnLobbyButton.style.display = 'none';

        cells.forEach((_, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.addEventListener('click', () => handleCellClick(index));
            gameBoard.appendChild(cellElement);
        });

        restartButton.addEventListener('click', setupGame);
        returnLobbyButton.addEventListener('click', returnToLobby);
    }

    function handleCellClick(index) {
        if (cells[index] || !isGameActive || currentPlayer !== 'X') return;

        cells[index] = currentPlayer;
        updateBoard();

        const winPattern = checkWin();
        if (winPattern) {
            gameStatus.textContent = `User wins!`;
            highlightWinningCells(winPattern);
            endGame();
        } else if (cells.every(cell => cell)) {
            gameStatus.textContent = 'Draw!';
            endGame();
        } else {
            currentPlayer = 'O';
            gameStatus.textContent = `Computer's turn`;
            setTimeout(computerMove, 500);
        }
    }

    function computerMove() {
        if (!isGameActive) return;

        const emptyCells = cells
            .map((cell, index) => (cell === null ? index : null))
            .filter(index => index !== null);

        if (emptyCells.length === 0) return;

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        cells[randomIndex] = 'O';
        updateBoard();

        const winPattern = checkWin();
        if (winPattern) {
            gameStatus.textContent = `Computer wins!`;
            highlightWinningCells(winPattern);
            endGame();
        } else if (cells.every(cell => cell)) {
            gameStatus.textContent = 'Draw!';
            endGame();
        } else {
            currentPlayer = 'X';
            gameStatus.textContent = `User's turn`;
        }
    }

    function updateBoard() {
        const cellElements = gameBoard.getElementsByClassName('cell');
        cells.forEach((cell, index) => {
            cellElements[index].textContent = cell;
        });
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return pattern;
            }
        }
        return null;
    }

    function highlightWinningCells(winPattern) {
        const cellElements = gameBoard.getElementsByClassName('cell');
        winPattern.forEach(index => {
            cellElements[index].classList.add('winning-cell');
        });
    }

    function endGame() {
        isGameActive = false;
        restartButton.style.display = 'block';
        returnLobbyButton.style.display = 'block';
    }

    function returnToLobby() {
        document.getElementById('gameLobby').style.display = 'block';
        document.getElementById('gamehub').innerHTML = '';
    }

    setupGame();
}
