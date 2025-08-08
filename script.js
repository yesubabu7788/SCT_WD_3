const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let cells = [];
let currentPlayer = "X";
let gameActive = true;

// Create board dynamically
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  board.appendChild(cell);
  cells.push(cell);
}

// Winning combos
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a].textContent === currentPlayer &&
           cells[b].textContent === currentPlayer &&
           cells[c].textContent === currentPlayer;
  });
}

function checkDraw() {
  return [...cells].every(cell => cell.textContent);
}

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.textContent) return;

  cell.textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    status.textContent = `It's a draw! 🤝`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

resetBtn.addEventListener('click', () => {
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "X's turn";
});
