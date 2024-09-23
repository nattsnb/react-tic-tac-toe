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

const Field = ({ id, fieldValue, makeMoveAndChangeTurn, turn }) => {
  const [fieldClassArgument, setFieldClassArgument] = useState(
    FieldClassArgument.none,
  );
  const handleClick = () => {
    makeMoveAndChangeTurn(id);
    if (turn === Turn.playerOne) {
      setFieldClassArgument(FieldClassArgument.firstPlayer);
    } else {
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
