/*
piesa l

  | 1 | 0 |
  | 1 | 0 |
  | 1 | 0 |
  | 1 | 1 |
*/

export const TETROMINOS = {
  O: {
    shape: [
      [true, true],
      [true, true],
    ],
    color: "red",
  },
  I: { shape: [[true], [true], [true]], color: "blue" },
  J: {
    shape: [
      [false, true],
      [false, true],
      [true, true],
    ],
    color: "green",
  },
  L: {
    shape: [
      [true, false],
      [true, false],
      [true, true],
    ],
    color: "grey",
  },
  S: {
    shape: [
      [false, true, true],
      [true, true, false],
    ],
    color: "purple",
  },
  Z: {
    shape: [
      [true, true, false],
      [false, true, true],
    ],
    color: "orange",
  },
  T: {
    shape: [
      [true, true, true],
      [false, true, false],
    ],
    color: "yellow",
  },
};

export const randomTetrominos = () => {
  const tetrominos = "IJLOSTZ";
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};
