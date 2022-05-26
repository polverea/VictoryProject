import { useState, useCallback } from "react";
import "./App.css";
import { RighPanel } from "./components/panel/panel.component";
import { TileBoard } from "./components/tile-board/tile-board.component";
import { useGameTime } from "./hooks/useGameTime";
import { useBoard } from "./hooks/useBoard";
import Button from "react-bootstrap/Button";
import { Badge, Col, Container, Row } from "react-bootstrap";

function App() {
  const [speed, setSpeed] = useState(1000);
  const [updateBoard, board, rotateLeft] = useBoard();

  const onTick = useCallback(() => {
    console.log("tic");
    updateBoard();
  }, []);
  const { startTime, stopTime, isRunning } = useGameTime({ onTick, speed });

  return (
    <div>
      <Container className="p-2 mb-3 text-center" fluid="sm">
        <Row>
          <h1>
            <Badge bg="secondary">Tetromino</Badge>
          </h1>
        </Row>
      </Container>

      <Container className="p-3 mb-3">
        <TileBoard board={board} />
        <div className="board"></div>

        <RighPanel>
          <Row className="d-grid gap-3 mt-5 mr-2">
            {
              <Button
                variant="primary"
                onClick={startTime}
                disabled={isRunning}
              >
                {" "}
                Start timer
              </Button>
            }

            <Button variant="primary" onClick={stopTime} disabled={!isRunning}>
              {" "}
              Stop timer{" "}
            </Button>

            <Button
              variant="success"
              onClick={() => {
                setSpeed(speed - 100);
              }}
              disabled={!isRunning}
            >
              Go faster
            </Button>

            <Button onClick={rotateLeft}>ROTATE</Button>
          </Row>
        </RighPanel>
      </Container>
    </div>
  );
}

export default App;
