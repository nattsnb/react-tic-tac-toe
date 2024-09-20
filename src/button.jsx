import styles from "./button.module.css";
import { useState } from "react";

const Button = ({ id, onClick, value }) => {
  return (
    <button
      className={styles.emptyField}
      value={value}
      disabled={value === null}
      onClick={() => onClick(id)}
    ></button>
  );
};

export default Button;
