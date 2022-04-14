import { l } from "../tetrominos";

import React from "react";

export default function Tetromino() {
  const squares = [];
  for (let i = 0; i < l.length; i++) {
    for (let j = 0; j < l[i].length; j++) {
      if (l[i][j] === true) {
        squares.push({ row: i + 1, col: j + 1 });
      }
    }
  }

  return (
    <>
      {squares.map(({ row, col }) => {
        return (
          <div
            style={{
              gridRowStart: row,
              gridRowEnd: row + 1,
              gridColumnStart: col,
              gridColumnEnd: col + 1,
              backgroundColor: "red",
            }}
          ></div>
        );
      })}
    </>
  );
}
