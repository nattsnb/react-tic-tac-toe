import styles from "./field.module.css";
import { useState } from "react";

const Field = ({ id, onClick, fieldValue, clickedFieldClassArgument }) => {
  return (
    <button
      className={clickedFieldClassArgument}
      disabled={fieldValue !== null}
      onClick={() => onClick(id)}
    >
      {fieldValue}
    </button>
  );
};

export default Field;
