import styles from "./board.module.css";
import CreateRow from "./createRow.jsx";
import { useEffect, useState } from "react";

const spacesIdMap = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const Board = () => {
  const [turn, setTurn] = useState(0);
  const XField = styles.XField;
  const OField = styles.OField;
  const makeMoveAndChangeTurn = (event) => {
    if (turn === 0) {
      setTurn(1);
      event.target.classList.add(XField);
    } else {
      setTurn(0);
      event.target.classList.add(OField);
    }
  };
  return (
    <div className={styles.wrapper}>
      <CreateRow idArray={spacesIdMap[0]} onClick={makeMoveAndChangeTurn} />
      <CreateRow idArray={spacesIdMap[1]} onClick={makeMoveAndChangeTurn} />
      <CreateRow idArray={spacesIdMap[2]} onClick={makeMoveAndChangeTurn} />
    </div>
  );
};

export default Board;
