import React from "react";
import { useBoard } from "../../hooks/useBoard";
import "./tile-board.styles.css";

export function TileBoard({ board }) {
  const tiles = [];

  board.forEach((row, rowIdx) => {
    row.forEach((val, colIdx) => {
      tiles.push({
        row: rowIdx + 1,
        col: colIdx + 1,
        color: val || "lightgray ",
      });
    });
  });

  return (
    <div className="tile-board">
      {" "}
      {tiles.map(({ row, col, color }) => {
        return (
          <div
            style={{
              gridRowStart: row,
              gridRowEnd: row + 1,
              gridColumnStart: col,
              gridColumnEnd: col + 1,
              backgroundColor: color,
            }}
          ></div>
        );
      })}
    </div>
  );
}
