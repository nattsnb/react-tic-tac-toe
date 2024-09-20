import styles from "./board.module.css";
import Row from "../Row";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import Field from "../Field";

const GameStatus = {
  draw: "draw",
  inProgress: "inProgress",
  gameOver: "gameOver",
};

const Turn = {
  playerOne: "playerOne",
  playerTwo: "playerTwo",
};

const initializeField = () => {
  return {
    id: uuid(),
    value: null,
    disabled: false,
  };
};

const initialBoard = {
  firstRow: [initializeField(), initializeField(), initializeField()],
  secondRow: [initializeField(), initializeField(), initializeField()],
  thirdRow: [initializeField(), initializeField(), initializeField()],
};

const Board = () => {
  const [board, setBoard] = useState(initialBoard);
  const [gameStatus, setGameStatus] = useState(GameStatus.inProgress);
  const [turn, setTurn] = useState(Turn.playerOne);

  const checkIfWon = () => {
    /*
     * 1. Check if won horizontally
     * 2. Check if won vertically
     * 3. Check if won diagonal
     * */
  };

  const checkIfDraw = () => {
    if (
      board[0][0].value !== null &&
      board[0][1].value !== null &&
      board[0][2].value !== null &&
      board[1][0].value !== null &&
      board[1][1].value !== null &&
      board[1][2].value !== null &&
      board[2][0].value !== null &&
      board[2][1].value !== null &&
      board[2][2].value !== null
    ) {
      return true;
    } else {
      return null;
    }
  };

  const getFieldById = (fieldIdToFind) => {
    for (const rowKey in board) {
      const rowArray = board[rowKey];
      const foundField = rowArray.find((field) => field.id === fieldIdToFind);
      if (foundField) {
        return foundField;
      }
    }
  };

  const move = (fieldId) => {
    const field = getFieldById(fieldId);
    if (!field.disabled && turn === Turn.playerOne) {
      field.value = turn;
      setBoard({ ...board });
      setTurn(Turn.playerTwo);
      checkIfWon();
    } else if (!field.disabled && turn === Turn.playerTwo) {
      setTurn(Turn.playerOne);
      checkIfWon();
    }
  };

  const makeMoveAndChangeTurn = (fieldId) => {
    if (gameStatus === GameStatus.inProgress) {
      move(fieldId);
    } else if (gameStatus === GameStatus.draw) {
      showDraw();
    } else {
      showPlayerWon();
    }
  };
  const showDraw = () => {};
  const showPlayerWon = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.board}>
        {Object.keys(board).map((singleRowKey) => (
          <Row
            key={singleRowKey}
            rowOfFields={board[singleRowKey]}
            makeMoveAndChangeTurn={makeMoveAndChangeTurn}
          />
        ))}
      </div>
      <div className={styles.infoBox}>
        <h1>Provide names:</h1>
        <p>Player 1:</p>
        <input></input>
        <p>Player 2:</p>
        <input></input>
        <button>Play</button>
      </div>
    </div>
  );
};

export default Board;
