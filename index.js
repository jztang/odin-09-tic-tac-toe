const gameBoard = (() => {
  let board;

  const getBoard = () => board;

  const setSquare = (index, marker) => {
    board[index] = marker;
  };

  const resetBoard = () => {
    board = new Array(9).fill("");
  };

  return { getBoard, setSquare, resetBoard };
})();

const displayController = (() => {
  const gameInfoDiv = document.querySelector(".game-info");
  const squareDivs = document.querySelectorAll(".square");

  const setGameInfo = (info) => {
    gameInfoDiv.textContent = info;
  };

  const updateSquare = (index) => {
    const squareMarker = gameBoard.getBoard()[index];
    if (squareMarker) {
      const squareDiv = squareDivs[index];
      squareDiv.textContent = squareMarker;
      squareDiv.classList.remove("active");
    }
  };

  return { setGameInfo, updateSquare };
})();

const gameController = (() => {
  let currentPlayer = "X";

  const clickSquare = (index) => {
    gameBoard.setSquare(index, currentPlayer);
    displayController.updateSquare(index);
    if (currentPlayer === "X") {
      currentPlayer = "O";
      displayController.setGameInfo("It's O's turn to move");
    } else {
      currentPlayer = "X";
      displayController.setGameInfo("It's X's turn to move");
    }
  };

  return { clickSquare };
})();

// Add click handlers to each square
document.querySelectorAll(".square").forEach((square, currentIndex) => {
  square.addEventListener("click", () => {
    if (square.classList.contains("active")) {
      gameController.clickSquare(currentIndex);
    }
  });
});

gameBoard.resetBoard();
