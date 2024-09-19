import styles from "./button.module.css";


const Button = ({ onClick }) => {
    return (
        <button
            className={styles.emptyField}
            disabled={false}
        ></button>
    )
}

export default Button