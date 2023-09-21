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

  const highlightSquares = (lineIndexes) => {
    lineIndexes.forEach((index) => {
      squareDivs[index].classList.add("highlighted");
    });
  };

  const disableAllSquares = () => {
    squareDivs.forEach((square) => {
      square.classList.remove("active");
    });
  };

  return { setGameInfo, updateSquare, highlightSquares, disableAllSquares };
})();

const gameController = (() => {
  let movesMade = 0;
  let currentPlayer = "X";

  const checkForWin = () => {
    let numInARow;
    let lineIndexes;

    // Check horizontal
    for (let i = 0; i <= 6; i += 3) {
      numInARow = 0;
      lineIndexes = [];
      for (let j = 0; j <= 2; j++) {
        if (currentPlayer === gameBoard.getBoard()[i + j]) {
          numInARow++;
          lineIndexes.push(i + j);
        }
        if (numInARow === 3) {
          return lineIndexes;
        }
      }
    }

    // Check vertical
    for (let i = 0; i <= 2; i++) {
      numInARow = 0;
      lineIndexes = [];
      for (let j = 0; j <= 6; j += 3) {
        if (currentPlayer === gameBoard.getBoard()[i + j]) {
          numInARow++;
          lineIndexes.push(i + j);
        }
        if (numInARow === 3) {
          return lineIndexes;
        }
      }
    }

    // Check diagonals
    if (
      currentPlayer === gameBoard.getBoard()[0] &&
      currentPlayer === gameBoard.getBoard()[4] &&
      currentPlayer === gameBoard.getBoard()[8]
    ) {
      return [0, 4, 8];
    }

    if (
      currentPlayer === gameBoard.getBoard()[2] &&
      currentPlayer === gameBoard.getBoard()[4] &&
      currentPlayer === gameBoard.getBoard()[6]
    ) {
      return [2, 4, 6];
    }

    return [];
  };

  const clickSquare = (index) => {
    movesMade++;
    gameBoard.setSquare(index, currentPlayer);
    displayController.updateSquare(index);
    const lineIndexes = checkForWin();
    if (lineIndexes.length > 0) {
      displayController.setGameInfo(`Game over - ${currentPlayer} wins!`);
      displayController.highlightSquares(lineIndexes);
      displayController.disableAllSquares();
    } else if (movesMade === 9) {
      displayController.setGameInfo("Game over - it's a tie!");
    } else if (currentPlayer === "X") {
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
