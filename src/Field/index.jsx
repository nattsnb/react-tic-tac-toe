import styles from "./field.module.css";

const Field = ({ id, onClick, fieldValue }) => {
  return (
    <button
      className={styles.emptyField}
      disabled={fieldValue !== null}
      onClick={() => onClick(id)}
    >
      {fieldValue}
    </button>
  );
};

export default Field;
