import styles from "./row.module.css";
import Button from "./button.jsx";
import { useState } from "react";

const Row = ({ rowOfFields, handleClick }) => {
  return (
    <div className={styles.row}>
      {rowOfFields.map((field) => (
        <Button
          key={field.id}
          id={field.id}
          onClick={handleClick}
          value={field.value}
          row={rowOfFields}
        />
      ))}
    </div>
  );
};

export default Row;
