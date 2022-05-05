import { randomTetrominos } from "../tetrominos";

export class Player {
  constructor(row = 0, column = 5) {
    this.currentPosition = {
      row,
      column,
    };
    this.tetrominoCoordinates = randomTetrominos();
  }

  iterate(callback) {
    this.tetrominoCoordinates.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        if (val === true) {
          const row = this.currentPosition.row + rowIdx;
          const column = this.currentPosition.column + colIdx;
          callback(row, column);
        }
      });
    });
  }

  updatePosition(board) {
    let shouldBeUpdated = this.checkCollision(board);
    if (shouldBeUpdated) this.currentPosition.row += 1;
    else this.currentPosition.row -= 1;
  }

  checkCollision(board) {
    let shouldBeUpdated = true;
    this.iterate((row, column) => {
      if (
        row < 0 ||
        row > 19 ||
        column < 0 ||
        column > 11 ||
        board[row][column] !== null
      ) {
        shouldBeUpdated = false;
      }
    });
    return shouldBeUpdated;
  }

  deletePosition(board) {
    this.iterate((row, column) => (board[row][column] = null));
  }

  draw(board) {
    this.iterate(
      (row, column) => (board[row][column] = this.tetrominoCoordinates.color)
    );
  }

  // listener(board) {
  //   document.addEventListener(
  //     "keyup",
  //     (event) => {
  //       var name = event.key;
  //       const shouldBeUpdated = this.checkCollision(board);
  //       if (name === "a") {
  //         this.deletePosition(board);
  //         this.currentPosition.column -= 1;
  //         this.draw(board);
  //         console.log("a", shouldBeUpdated);
  //       } else if (name === "d") {
  //         this.deletePosition(board);
  //         this.currentPosition.column += 1;
  //         this.draw(board);
  //         console.log("d", shouldBeUpdated);
  //       }
  //     },
  //     false
  //   );
  // }
}
