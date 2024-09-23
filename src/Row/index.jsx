import styles from "./row.module.css";
import Field from "../Field";

const Row = ({ rowOfFields, makeMoveAndChangeTurn, turn, gameStatus }) => {
  return (
    <div className={styles.row}>
      {rowOfFields.map((field) => (
        <Field
          key={field.id}
          id={field.id}
          fieldValue={field.value}
          makeMoveAndChangeTurn={makeMoveAndChangeTurn}
          turn={turn}
          gameStatus={gameStatus}
        />
      ))}
    </div>
  );
};

export default Row;
