import styles from "./field.module.css";
import { useState } from "react";

const Turn = {
  playerOne: "playerOne",
  playerTwo: "playerTwo",
};

const FieldClassArgument = {
  none: styles.emptyField,
  firstPlayer: styles.firstPlayerField,
  secondPlayer: styles.secondPlayerField,
};

const GameStatus = {
  draw: "draw",
  inProgress: "inProgress",
  gameOver: "gameOver",
};

const Field = ({ id, fieldValue, makeMoveAndChangeTurn, turn, gameStatus }) => {
  const [fieldClassArgument, setFieldClassArgument] = useState(
    FieldClassArgument.none,
  );
  const handleClick = () => {
    makeMoveAndChangeTurn(id);
    if (turn === Turn.playerOne && gameStatus === GameStatus.inProgress) {
      setFieldClassArgument(FieldClassArgument.firstPlayer);
    } else if (gameStatus === GameStatus.inProgress) {
      setFieldClassArgument(FieldClassArgument.secondPlayer);
    }
  };
  return (
    <button
      className={fieldClassArgument}
      disabled={fieldValue !== null}
      onClick={() => handleClick()}
    ></button>
  );
};

export default Field;
