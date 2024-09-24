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
  const [arrowFirstPlayerClass, setArrowFirstPlayerClass] = useState(
    styles.arrowForPlayerOn,
  );
  const [arrowSecondPlayerClass, setArrowSecondPlayerClass] = useState(
    styles.arrowForPlayerOff,
  );

  const checkIfWonOrDrawAndSetGameStatus = () => {
    checkIfWonHorizontally();
    checkIfWonVertically();
    checkIfWonDiagonally();
    checkIfDraw();
  };

  const checkConditionsToWin = (array) => {
    return allEqual(array) && array[0].value !== null;
  };
  const allEqual = (array) =>
    array.every((object) => object.value === array[0].value);

  const checkIfWonHorizontally = () => {
    for (const row of Object.values(board)) {
      if (checkConditionsToWin(row)) {
        setGameStatus(GameStatus.gameOver);
        setH1Title(H1Title.playerWon);
        showWinner();
      }
    }
  };

  const checkIfWonVertically = () => {
    for (let i = 0; i < Object.keys(board).length; i++) {
      let horizontalResultArray = [];
      for (const row of Object.values(board)) {
        horizontalResultArray.push(row[i]);
      }
      if (checkConditionsToWin(horizontalResultArray)) {
        setGameStatus(GameStatus.gameOver);
        setH1Title(H1Title.playerWon);
        showWinner();
      }
    }
  };

  const checkIfWonDiagonally = () => {
    const rightDiagonalResultArray = [
      Object.values(board)[0][0],
      Object.values(board)[1][1],
      Object.values(board)[2][2],
    ];
    if (checkConditionsToWin(rightDiagonalResultArray)) {
      setGameStatus(GameStatus.gameOver);
      setH1Title(H1Title.playerWon);
      showWinner();
    } else {
      const leftDiagonalResultArray = [
        Object.values(board)[0][2],
        Object.values(board)[1][1],
        Object.values(board)[2][0],
      ];
      if (checkConditionsToWin(leftDiagonalResultArray)) {
        setGameStatus(GameStatus.gameOver);
        setH1Title(H1Title.playerWon);
        showWinner();
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
      // setArrowToSecondPlayer();
    } else if (!field.disabled && turn === Turn.playerTwo) {
      setTurn(Turn.playerOne);
      // setArrowToFirstPlayer();
    }
    setBoard({ ...board });
    checkIfWonOrDrawAndSetGameStatus();
  };

  // const setArrowToFirstPlayer = () => {
  //   if (gameStatus === GameStatus.inProgress) {
  //     setArrowFirstPlayerClass(styles.arrowForPlayerOn);
  //     setArrowSecondPlayerClass(styles.arrowForPlayerOff);
  //   }
  // };
  //
  // const setArrowToSecondPlayer = () => {
  //   if (gameStatus === GameStatus.inProgress) {
  //     setArrowFirstPlayerClass(styles.arrowForPlayerOff);
  //     setArrowSecondPlayerClass(styles.arrowForPlayerOn);
  //   }
  // };

  const makeMoveAndChangeTurn = (fieldId) => {
    if (gameStatus === GameStatus.inProgress) {
      move(fieldId);
    }
  };
  const showDraw = () => {
    setTurn(Turn.none)
  };
  const showWinner = () => {
    if (turn === Turn.playerTwo) {
      setTurn(Turn.playerOne)
    } else {
      setTurn(Turn.playerTwo)
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
        <div className={styles.arrowAndPlayerContainer}>
          <BsArrowRightShort className={turn === Turn.playerOne ? styles.arrowForPlayerOn : styles.arrowForPlayerOff} />
          <p className={styles.paragraphPlayerName}>{firstPlayerName}</p>
          </div>
        <div className={styles.arrowAndPlayerContainer}>
          <BsArrowRightShort className={turn === Turn.playerTwo ? styles.arrowForPlayerOn : styles.arrowForPlayerOff} />
          <p className={styles.paragraphPlayerName}>{secondPlayerName}</p>
        </div>
      </div>
    </div>
  );
};

export default Board;
