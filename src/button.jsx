import styles from "./button.module.css";
import { useState } from "react";

const Button = ({ id, onClick, value }) => {
  return (
    <button
      className={styles.emptyField}
      value={value}
      disabled={false}
      onClick={() => onClick(event)}
    ></button>
  );
};

export default Button;
