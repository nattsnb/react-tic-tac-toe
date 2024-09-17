import styles from './board.module.css'
import CreateRow from "./createRow.jsx";

const spacesIdMap = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

const Board = () => {
    return (
        <div className={styles.wrapper}>
            <CreateRow idArray={spacesIdMap[0]}/>
            <CreateRow idArray={spacesIdMap[1]}/>
            <CreateRow idArray={spacesIdMap[2]}/>
        </div>
    )
}


export default Board
