import styles from "./row.module.css";
import Button from "./button.jsx";

const Row = ({ rowOfFields, functionForButton }) => {
  return (
    <div className={styles.row}>
      {rowOfFields.map((field) => (
        <Button key={ field.id } onClick={ functionForButton( field.id ) }/>
      ))}
    </div>
  );
};

export default Row;
