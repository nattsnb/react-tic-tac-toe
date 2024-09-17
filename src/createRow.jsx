import styles from "./createRow.module.css";


const CreateRow = ({ idArray }) => {
    return (
        <div className={styles.row}>
            {idArray.map((id) => (
                <div
                    key={id}
                />
            ))}
        </div>
    )
}

export default CreateRow