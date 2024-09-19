import styles from "./button.module.css";
import {useState} from "react";

const Button = ({ id, onClick }) => {
  return <button className={styles.emptyField} disabled={false} onClick={()=>onClick(id)}></button>;
};

export default Button;
