import { useState, useEffect, useRef } from "react";
import { randomTetrominos } from "../tetrominos";
import { getEmptyBoard } from "../utils/utils";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard);
  const player = useRef({
    currentPosition: { row: -1, column: 5 },
    tetrominoCoordinates: randomTetrominos(),
  });

  useEffect(() => {
    updateBoard(board);
  }, []);

  const updatePosition = () => {
    player.current = {
      currentPosition: {
        row: player.current.currentPosition.row + 1,
        column: player.current.currentPosition.column,
      },
      tetrominoCoordinates: player.current.tetrominoCoordinates,
    };
  };
  const updateBoard = () => {
    updatePosition();
    player.current.tetrominoCoordinates.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        const row = player.current.currentPosition.row + rowIdx;
        const column = player.current.currentPosition.column + colIdx;
        if (row > 0) {
          board[row - 1][column] = null;
        }
      });
    });

    player.current.tetrominoCoordinates.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        const row = player.current.currentPosition.row + rowIdx;
        const column = player.current.currentPosition.column + colIdx;
        if (val === true)
          board[row][column] = player.current.tetrominoCoordinates.color;
      });
    });

    setBoard([...board]);
  };
  return [updateBoard, board];
};
