const gameboard = (() => {
  let board;

  const getBoard = () => board;

  const resetBoard = () => {
    board = new Array(9).fill("");
  };

  return { getBoard, resetBoard };
})();

gameboard.resetBoard();
