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

  const checkIfWon = () => {
    if (
      initialBoard[0][0].value !== null &&
      initialBoard[0][0].value === initialBoard[0][1].value &&
      initialBoard[0][1].value === initialBoard[0][2].value
    ) {
      return initialBoard[0][0].value;
    } else if (
      initialBoard[1][0].value !== null &&
      initialBoard[1][0].value === initialBoard[1][1].value &&
      initialBoard[1][1].value === initialBoard[1][2].value
    ) {
      return initialBoard[1][0].value;
    } else if (
      initialBoard[2][0].value !== null &&
      initialBoard[2][0].value === initialBoard[2][1].value &&
      initialBoard[2][1].value === initialBoard[2][2].value
    ) {
      return initialBoard[2][0].value;
    } else if (
      initialBoard[0][0].value !== null &&
      initialBoard[0][0].value === initialBoard[1][0].value &&
      initialBoard[1][0].value === initialBoard[2][0].value
    ) {
      return initialBoard[0][0].value;
    } else if (
      initialBoard[0][1].value !== null &&
      initialBoard[0][1].value === initialBoard[1][1].value &&
      initialBoard[1][1].value === initialBoard[2][1].value
    ) {
      return initialBoard[0][1].value;
    } else if (
      initialBoard[0][2].value !== null &&
      initialBoard[0][2].value === initialBoard[1][2].value &&
      initialBoard[1][2].value === initialBoard[2][2].value
    ) {
      return initialBoard[0][2].value;
    } else if (
      initialBoard[0][0].value !== null &&
      initialBoard[0][0].value === initialBoard[1][1].value &&
      initialBoard[1][1].value === initialBoard[2][2].value
    ) {
      return initialBoard[0][0].value;
    } else if (
      initialBoard[0][2].value !== null &&
      initialBoard[0][2].value === initialBoard[1][1].value &&
      initialBoard[1][1].value === initialBoard[2][0].value
    ) {
      return initialBoard[0][2].value;
    } else {
      checkIfDraw();
    }
  };

  const checkIfDraw = () => {
    if (
      initialBoard[0][0].value !== null &&
      initialBoard[0][1].value !== null &&
      initialBoard[0][2].value !== null &&
      initialBoard[1][0].value !== null &&
      initialBoard[1][1].value !== null &&
      initialBoard[1][2].value !== null &&
      initialBoard[2][0].value !== null &&
      initialBoard[2][1].value !== null &&
      initialBoard[2][2].value !== null
    ) {
      return true;
    } else {
      return null;
    }
  };
  let outcome = null;
  const makeMoveAndChangeTurn = (event) => {
    console.log(outcome);
    if (!outcome) {
      if (!event.target.disabled) {
        if (turn === 0) {
          console.log(event.target.value)
          event.target.value = 0;
          console.log(event.target.value)
          console.log(initialBoard[0][0])
          turn = 1;
          event.target.disabled = true;
          event.target.classList.add(styles.FirstPlayerField);
          outcome = checkIfWon();
        } else {
          event.target.value = 1;
          turn = 0;
          event.target.disabled = true;
          event.target.classList.add(styles.SecondPlayerField);
          outcome = checkIfWon();
        }
      }
    } else if (outcome === true) {
      showDraw();
    } else {
      showPlayerWon(outcome);
    }
  };
  const showDraw = () => {
    console.log("draw");
  };
  const showPlayerWon = (player) => {
    console.log(`${player} won`);
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
