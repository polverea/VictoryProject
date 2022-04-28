import { useState, useCallback } from "react";
import "./App.css";
import { RighPanel } from "./components/panel/panel.component";
import { TileBoard } from "./components/tile-board/tile-board.component";
import { useGameTime } from "./hooks/useGameTime";
import { useBoard } from "./hooks/useBoard";

function App() {
  const [speed, setSpeed] = useState(1000);
  const [updateBoard, board] = useBoard();

  const onTick = useCallback(() => {
    console.log("tic");
    updateBoard();
  }, []);
  const { startTime, stopTime, isRunning } = useGameTime({ onTick, speed });

  return (
    <div className="container">
      <TileBoard board={board} />
      <div className="board"></div>
      <RighPanel>
        <button onClick={startTime} disabled={isRunning}>
          {" "}
          Start timer
        </button>
        <button onClick={stopTime} disabled={!isRunning}>
          {" "}
          Stop timer{" "}
        </button>
        <button
          onClick={() => {
            setSpeed(speed - 100);
          }}
          disabled={!isRunning}
        >
          Go faster
        </button>
      </RighPanel>
    </div>
  );
}

export default App;
