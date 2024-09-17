import styles from "./createRow.module.css";

const CreateRow = ({ idArray, onClick }) => {
  return (
    <div className={styles.row}>
      {idArray.map((id) => (
        <button
          className={styles.emptyField}
          key={id}
          onClick={onClick}
        ></button>
      ))}
    </div>
  );
};

export default CreateRow;
