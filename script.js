const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');
const themeSelector = document.getElementById('theme');
let currentPlayer = 'X';
let board = Array(9).fill(null);

// Sound effects
const clickSound = new Audio('click.mp3');
const winSound = new Audio('win.mp3');
const tieSound = new Audio('tie.mp3');

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
resetButton.addEventListener('click', resetGame);
themeSelector.addEventListener('change', changeTheme);

function handleClick(event) {
    const index = event.target.dataset.index;
    
    if (board[index] || checkWinner()) {
        return;
    }

    clickSound.play();
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWinner()) {
        messageElement.textContent = `${currentPlayer} wins!`;
        winSound.play();
        celebrateWin();
    } else if (board.every(cell => cell)) {
        messageElement.textContent = "It's a tie!";
        tieSound.play();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return combination;
        }
    }
    return null;
}

function celebrateWin() {
    cells.forEach(cell => {
        cell.style.animation = 'celebrate 1s infinite';
    });
    setTimeout(() => {
        cells.forEach(cell => {
            cell.style.animation = '';
        });
    }, 3000);
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

function changeTheme() {
    document.body.className = themeSelector.value;
}
