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
    disabled: false,
  };
};

const Board = () => {
  const initialBoard = [
    [initializeField(), initializeField(), initializeField()],
    [initializeField(), initializeField(), initializeField()],
    [initializeField(), initializeField(), initializeField()],
  ];

  const  [board, setBoard] = useState(initialBoard)
  let turn = 0;

  const checkIfWon = () => {
    if (
      board[0][0].value !== null &&
      board[0][0].value === board[0][1].value &&
      board[0][1].value === board[0][2].value
    ) {
      return board[0][0].value;
    } else if (
      board[1][0].value !== null &&
      board[1][0].value === board[1][1].value &&
      board[1][1].value === board[1][2].value
    ) {
      return board[1][0].value;
    } else if (
      board[2][0].value !== null &&
      board[2][0].value === board[2][1].value &&
      board[2][1].value === board[2][2].value
    ) {
      return board[2][0].value;
    } else if (
      board[0][0].value !== null &&
      board[0][0].value === board[1][0].value &&
      board[1][0].value === board[2][0].value
    ) {
      return board[0][0].value;
    } else if (
      board[0][1].value !== null &&
      board[0][1].value === board[1][1].value &&
      board[1][1].value === board[2][1].value
    ) {
      return board[0][1].value;
    } else if (
      board[0][2].value !== null &&
      board[0][2].value === board[1][2].value &&
      board[1][2].value === board[2][2].value
    ) {
      return board[0][2].value;
    } else if (
      board[0][0].value !== null &&
      board[0][0].value === board[1][1].value &&
      board[1][1].value === board[2][2].value
    ) {
      return board[0][0].value;
    } else if (
      board[0][2].value !== null &&
      board[0][2].value === board[1][1].value &&
      board[1][1].value === board[2][0].value
    ) {
      return board[0][2].value;
    } else {
      checkIfDraw();
    }
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
  let outcome = null;

  const makeMoveAndChangeTurn = (id) => {
    console.log(outcome);
    let field = []
    for(const element of board) {
      const foundField = element.find((field) => field.id === id)
      if(foundField){
        field = foundField
      }
    }
    if (!outcome) {
      console.log(field.disabled)
      if (!field.disabled) {
        console.log("here")
        if (turn === 0) {
          setBoard(board.map(field =>{
            if (field.id === id) {
              return {...field, value: field.value = 0}
            }
          }))
          console.log(board)
          turn = 1;
          event.target.classList.add(styles.FirstPlayerField);
          outcome = checkIfWon();
        } else {
          event.target.value = 1;
          turn = 0;
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
        {board.map((singleRow) => (
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
