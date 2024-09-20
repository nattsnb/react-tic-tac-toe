import styles from "./board.module.css";
import Row from "./row.jsx";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import button from "./button.jsx";
import { MouseEvent } from "react";

const initializeField = () => {
  return {
    id: uuid(),
    value: null,
  };
};

const Board = () => {
  let turn = 0;
  const initialBoard = [
    [initializeField(), initializeField(), initializeField()],
    [initializeField(), initializeField(), initializeField()],
    [initializeField(), initializeField(), initializeField()],
  ];

  const makeMoveAndChangeTurn = (event) => {
    if (event.target.disabled !== true) {
      if (turn === 0) {
        event.target.value = 0;
        turn = 1;
        event.target.disabled = true;
      } else {
        event.target.value = 1;
        turn = 0;
        event.target.disabled = true;
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
