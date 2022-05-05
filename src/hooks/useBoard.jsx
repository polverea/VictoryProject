import { useState, useEffect, useRef } from "react";
import { randomTetrominos } from "../tetrominos";
import { getEmptyBoard } from "../utils/utils";
import { Player } from "../Classes/Player";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard);
  const player = useRef(new Player());

  useEffect(() => {
    updateBoard(board);
  }, []);

  const updateBoard = () => {
    //sterge
    player.current.deletePosition(board);
    //face update in jos
    player.current.updatePosition(board);

    let shouldBeUpdated = player.current.checkCollision(board);
    //verifica daca exista o coliziune
    if (!shouldBeUpdated) {
      //face update in sus
      player.current.updatePosition(board);
    }
    // deseneaza
    player.current.draw(board);
    //nu sunt coliziuni => tetromino nou
    if (!shouldBeUpdated) {
      player.current = new Player();
    }
    // player.current.listener(board);
    setBoard([...board]);
  };

  return [updateBoard, board];
};
