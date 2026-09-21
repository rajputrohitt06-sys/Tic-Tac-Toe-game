const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const newGameButton = document.getElementById("newGame");
const resetScoreButton = document.getElementById("resetScore");

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

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

function handleCellClick(event) {
  const index = Number(event.target.dataset.index);

  if (!gameActive || board[index] !== "") {
    return;
  }

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  const result = checkResult();

  if (result === "win") {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;

    if (currentPlayer === "X") {
      scoreX++;
      scoreXElement.textContent = scoreX;
    } else {
      scoreO++;
      scoreOElement.textContent = scoreO;
    }

    return;
  }

  if (result === "draw") {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return "win";
    }
  }

  return board.every(cell => cell !== "") ? "draw" : "continue";
}

function newGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";

  cells.forEach(cell => {
    cell.textContent = "";
  });
}

function resetScore() {
  scoreX = 0;
  scoreO = 0;
  scoreXElement.textContent = "0";
  scoreOElement.textContent = "0";
  newGame();
}

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

newGameButton.addEventListener("click", newGame);
resetScoreButton.addEventListener("click", resetScore);
