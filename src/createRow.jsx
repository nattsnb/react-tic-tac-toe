import styles from "./createRow.module.css";


const CreateRow = ({ idArray }) => {
    return (
        <div className={styles.row}>
            {idArray.map((id) => (
                <div className={styles.field}
                     key={id}>
                    {id}
                </div>

            ))}
        </div>
    )
}

export default CreateRow