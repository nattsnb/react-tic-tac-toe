import styles from "./row.module.css";
import Field from "../Field";

const Row = ({
  rowOfFields,
  makeMoveAndChangeTurn,
  clickedFieldClassArgument,
}) => {
  return (
    <div className={styles.row}>
      {rowOfFields.map((field) => (
        <Field
          key={field.id}
          id={field.id}
          onClick={makeMoveAndChangeTurn}
          fieldValue={field.value}
          clickedFieldClassArgument={clickedFieldClassArgument}
        />
      ))}
    </div>
  );
};

export default Row;
