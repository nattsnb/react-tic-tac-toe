import styles from "./row.module.css";
import Button from "./button.jsx";
import {useState} from "react";

const Row = ({ rowOfFields, functionForButton }) => {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.row}>
      {rowOfFields.map((field) => (
        <Button key={field.id} id={field.id} onClick={functionForButton} />
      ))}
    </div>
  );
};

export default Row;
