const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

function startGame() {
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
  gameActive = true;
  messageElement.innerText = '';
}

function handleClick(e) {
  const cell = e.target;
  if (!gameActive) return;

  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    messageElement.innerText = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    messageElement.innerText = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].innerText === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.innerText !== '');
}

restartButton.addEventListener('click', startGame);

startGame();
