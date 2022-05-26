import { useState, useEffect, useRef } from "react";

import { getEmptyBoard } from "../utils/utils";
import { Player } from "../Classes/Player";
import { DIRECTION } from "../tetrominos";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard);
  const player = useRef(new Player());

  useEffect(() => {
    updateBoard(board);
  }, []);

  useEffect(() => {
    const listener = (event) => {
      var name = event.key;
      if (name === "a") {
        player.current.deletePosition(board);
        player.current.currentPosition.column -= 1;
        const collided = player.current.checkCollision(board);
        if (collided) {
          player.current.currentPosition.column += 1;
        }
        player.current.draw(board);
        console.log("a", collided);
      } else if (name === "d") {
        player.current.deletePosition(board);
        player.current.currentPosition.column += 1;
        const collided = player.current.checkCollision(board);
        if (collided) {
          player.current.currentPosition.column -= 1;
        }
        player.current.draw(board);
        console.log("d", collided);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [board]);

  const updateBoard = () => {
    //sterge
    player.current.deletePosition(board);
    //face update in jos
    player.current.updatePosition(DIRECTION.down);

    let collided = player.current.checkCollision(board);
    //verifica daca exista o coliziune
    if (collided) {
      //face update in sus
      player.current.updatePosition(DIRECTION.up);
    }
    // deseneaza
    player.current.draw(board);
    //nu sunt coliziuni => tetromino nou
    if (collided && DIRECTION.down) {
      let linesToErase = [];
      for (let i = 0; i < 20; i++) {
        let isLineComplete = true;
        for (let j = 0; j < 12; j++) {
          if (board[i][j] === null) {
            isLineComplete = false;
            console.log("board", board[i][j]);
          }
        }
        if (isLineComplete) {
          linesToErase.push(i);
        }
      }
      eraseLines(linesToErase, board);
      player.current = new Player();
      player.current.draw(board);
    }

    setBoard([...board]);
  };

  const rotateRight = () => {
    player.current.deletePosition(board);
    var result = [];
    player.current.tetrominoCoordinates.shape.forEach(function (a, i) {
      a.forEach(function (b, j, bb) {
        result[bb.length - j - 1] = result[bb.length - j - 1] || [];
        result[bb.length - j - 1][i] = b;
      });
    });
    player.current.tetrominoCoordinates.shape = result;
    player.current.draw(board);
  };

  function eraseLines(linesToErase, board) {
    for (let i = 0; i < linesToErase.length; i++) {
      let lineIndex = linesToErase[i] - i;
      for (let m = lineIndex; m > 0; m--) {
        for (let n = 0; n < 12; n++) {
          board[m][n] = board[m - 1][n];
        }
      }
    }
  }

  const rotateLeft = () => {
    player.current.deletePosition(board);
    var result = [];
    player.current.tetrominoCoordinates.shape.forEach(function (a, i, aa) {
      a.forEach(function (b, j) {
        result[j] = result[j] || [];
        result[j][aa.length - i - 1] = b;
      });
    });
    player.current.tetrominoCoordinates.shape = result;
    if (player.current.checkCollision(board)) {
      rotateRight();
    } else {
      player.current.draw(board);
    }
  };

  return [updateBoard, board, rotateLeft];
};
