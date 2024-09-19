import styles from "./button.module.css";

const Button = ({ id, onClick }) => {
  return <button className={styles.emptyField} disabled={false} onClick={onClick}></button>;
};

export default Button;
