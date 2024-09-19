import styles from "./board.module.css";
import Row from "./row.jsx";
import { useState } from "react";
import { v4 as uuid } from "uuid";

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
    console.log(fieldId)
    if (turn === 0) {
      setTurn(1);
    } else {
      setTurn(0);
    }
  };

  return (
    <div className={styles.wrapper}>
      {initialBoard.map((singleRow) => (
        <Row
          key={uuid()}
          rowOfFields={singleRow}
          functionForButton={makeMoveAndChangeTurn}
        />
      ))}
    </div>
  );
};

export default Board;
