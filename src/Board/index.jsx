import styles from "./board.module.css";
import Row from "../Row";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { BsArrowRightShort } from "react-icons/bs";

const GameStatus = {
  draw: "draw",
  inProgress: "inProgress",
  gameOver: "gameOver",
};

const Turn = {
  playerOne: "playerOne",
  playerTwo: "playerTwo",
  none: null,
};

const H1Title = {
  game: "Play:",
  playerWon: `Player Won:`,
  draw: "Draw!",
};

const initializeField = () => {
  return {
    id: uuid(),
    value: null,
    disabled: false,
  };
};

const initialBoard = {
  firstRow: [initializeField(), initializeField(), initializeField()],
  secondRow: [initializeField(), initializeField(), initializeField()],
  thirdRow: [initializeField(), initializeField(), initializeField()],
};

const Board = ({ firstPlayerName, secondPlayerName }) => {
  const [board, setBoard] = useState(initialBoard);
  const [gameStatus, setGameStatus] = useState(GameStatus.inProgress);
  const [turn, setTurn] = useState(Turn.playerOne);
  const [h1Title, setH1Title] = useState(H1Title.game);
  const [winnerName, setWinnerName] = useState(null);

  const checkIfWonOrDrawAndSetGameStatus = () => {
    checkIfWonHorizontally();
    checkIfWonVertically();
    checkIfWonDiagonally();
    checkIfDraw();
  };

  const checkIfFieldsValueAllEqualAndNotNull = (array) => {
    return allEqual(array) && array[0].value !== null;
  };
  const allEqual = (array) =>
    array.every((object) => object.value === array[0].value);

  const checkIfWonHorizontally = () => {
    for (const row of Object.values(board)) {
      if (checkIfFieldsValueAllEqualAndNotNull(row)) {
        setGameStatus(GameStatus.gameOver);
        setH1Title(H1Title.playerWon);
        showWinner(row[0].value);
      }
    }
  };

  const checkIfWonVertically = () => {
    for (let i = 0; i < Object.keys(board).length; i++) {
      const verticalResultsArray = produceArrayWithFieldsValuesInColumn(
        board,
        i,
      );
      if (checkIfFieldsValueAllEqualAndNotNull(verticalResultsArray)) {
        setGameStatus(GameStatus.gameOver);
        setH1Title(H1Title.playerWon);
        showWinner(verticalResultsArray[0].value);
      }
    }
  };

  const produceArrayWithFieldsValuesInColumn = (board, i) => {
    let verticalResultArray = [];
    for (const row of Object.values(board)) {
      verticalResultArray.push(row[i]);
    }
    return verticalResultArray;
  };

  const checkIfWonDiagonally = () => {
    const rightDiagonalResultArray = [
      Object.values(board)[0][0],
      Object.values(board)[1][1],
      Object.values(board)[2][2],
    ];
    if (checkIfFieldsValueAllEqualAndNotNull(rightDiagonalResultArray)) {
      setGameStatus(GameStatus.gameOver);
      setH1Title(H1Title.playerWon);
      showWinner(rightDiagonalResultArray[0].value);
    } else {
      const leftDiagonalResultArray = [
        Object.values(board)[0][2],
        Object.values(board)[1][1],
        Object.values(board)[2][0],
      ];
      if (checkIfFieldsValueAllEqualAndNotNull(leftDiagonalResultArray)) {
        setGameStatus(GameStatus.gameOver);
        setH1Title(H1Title.playerWon);
        showWinner(leftDiagonalResultArray[0].value);
      }
    }
  };

  const checkIfDraw = () => {
    let allResultsArray = [];
    for (const row of Object.values(board)) {
      allResultsArray.push(row);
    }
    allResultsArray = allResultsArray.flat();
    allResultsArray = allResultsArray.filter((result) => result.value === null);
    if (allResultsArray.length === 0) {
      setGameStatus(GameStatus.draw);
      setH1Title(H1Title.draw);
      showDraw();
    }
  };

  const getFieldById = (fieldIdToFind) => {
    for (const rowKey in board) {
      const rowArray = board[rowKey];
      const foundField = rowArray.find((field) => field.id === fieldIdToFind);
      if (foundField) {
        return foundField;
      }
    }
  };

  const move = (fieldId) => {
    const field = getFieldById(fieldId);
    field.value = turn;
    if (!field.disabled && turn === Turn.playerOne) {
      setTurn(Turn.playerTwo);
    } else if (!field.disabled && turn === Turn.playerTwo) {
      setTurn(Turn.playerOne);
    }
    setBoard({ ...board });
    checkIfWonOrDrawAndSetGameStatus();
  };

  const makeMoveAndChangeTurn = (fieldId) => {
    if (gameStatus === GameStatus.inProgress) {
      move(fieldId);
    }
  };
  const showDraw = () => {
    setTurn(Turn.none);
  };
  const showWinner = (winnerFieldValue) => {
    setTurn(Turn.none);
    if (winnerFieldValue === "playerOne") {
      setWinnerName(firstPlayerName);
    } else {
      setWinnerName(secondPlayerName);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.board}>
        {Object.keys(board).map((singleRowKey) => (
          <Row
            key={singleRowKey}
            rowOfFields={board[singleRowKey]}
            makeMoveAndChangeTurn={makeMoveAndChangeTurn}
            turn={turn}
            gameStatus={gameStatus}
          />
        ))}
      </div>
      <div className={styles.infoBox}>
        <h1>{h1Title}</h1>
        {!winnerName ? (
          <div>
            <div className={styles.arrowAndPlayerContainer}>
              {turn === Turn.playerOne ? (
                <BsArrowRightShort className={styles.arrowForPlayerOn} />
              ) : (
                <BsArrowRightShort className={styles.arrowForPlayerOff} />
              )}
              <p className={styles.paragraphPlayerName}>{firstPlayerName}</p>
            </div>
            <div className={styles.arrowAndPlayerContainer}>
              {turn === Turn.playerTwo ? (
                <BsArrowRightShort className={styles.arrowForPlayerOn} />
              ) : (
                <BsArrowRightShort className={styles.arrowForPlayerOff} />
              )}
              <p className={styles.paragraphPlayerName}>{secondPlayerName}</p>
            </div>
          </div>
        ) : (
          <div className={styles.winnerMessage}>{winnerName}!</div>
        )}
      </div>
    </div>
  );
};

export default Board;
