import { DIRECTION, randomTetrominos } from "../tetrominos";

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

  updatePosition(direction) {
    if (direction === DIRECTION.down) this.currentPosition.row += 1;
    if (direction === DIRECTION.up) this.currentPosition.row -= 1;
  }

  checkCollision(board) {
    let collided = false;
    this.iterate((row, column) => {
      if (
        row < 0 ||
        row > 19 ||
        column < 0 ||
        column > 11 ||
        board[row][column] !== null
      ) {
        collided = true;
      }
    });
    return collided;
  }

  deletePosition(board) {
    this.iterate((row, column) => (board[row][column] = null));
  }

  draw(board) {
    this.iterate(
      (row, column) => (board[row][column] = this.tetrominoCoordinates.color)
    );
  }
}
