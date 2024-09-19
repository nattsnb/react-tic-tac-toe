import styles from "./board.module.css";
import Row from "./row.jsx";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import button from "./button.jsx";

const initializeField = () => {
  return {
    id: uuid(),
    value: null,
  };
};

const initialBoard = [
  [initializeField(), initializeField(), initializeField()],
  [initializeField(), initializeField(), initializeField()],
  [initializeField(), initializeField(), initializeField()],
];

const Board = () => {
  const [turn, setTurn] = useState(0);

  const makeMoveAndChangeTurn = (fieldId) => {
    console.log(button.disabled)
    if (button.disabled===false) {
      if (turn === 0) {
        setTurn(1);
      } else {
        setTurn(0);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.board}>
        {initialBoard.map((singleRow) => (
          <Row
            key={uuid()}
            rowOfFields={singleRow}
            handleClick={makeMoveAndChangeTurn}
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
