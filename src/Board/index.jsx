import styles from "./board.module.css";
import Row from "../Row";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import Field from "../Field";

const GameStatus = {
  draw: "draw",
  inProgress: "inProgress",
  gameOver: "gameOver",
};

const Turn = {
  playerOne: "playerOne",
  playerTwo: "playerTwo",
};

const ClickedFieldClassArgument = {
  none: styles.emptyField,
  firstPlayer: styles.firstPlayerField,
  secondPlayer: styles.secondPlayerField,
};

const H1Title = {
  initial: "Provide names:",
  game: "Play:",
  playerWon: `Player Won:`,
  draw: "Draw!",
}

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

const Board = () => {
  const [board, setBoard] = useState(initialBoard);
  const [gameStatus, setGameStatus] = useState(GameStatus.inProgress);
  const [turn, setTurn] = useState(Turn.playerOne);
  const [winner, setWinner] = useState(null);
  const [clickedFieldClassArgument, setClickedFieldClass] = useState(
    ClickedFieldClassArgument.none,
  );
  const [firstPlayerName, setFirstPlayerName] = useState("Name")
  const [secondPlayerName, setSecondPlayerName] = useState("Name")
  const [h1Title, setH1Title] = useState(H1Title.initial)

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
        setWinner(row[0].value);
        setH1Title(H1Title.playerWon)
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
        setWinner(horizontalResultArray[0].value);
        setH1Title(H1Title.playerWon)
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
      setWinner(rightDiagonalResultArray[0].value);
      setH1Title(H1Title.playerWon)
    } else {
      const leftDiagonalResultArray = [
        Object.values(board)[0][2],
        Object.values(board)[1][1],
        Object.values(board)[2][0],
      ];
      if (checkConditionsToWin(leftDiagonalResultArray)) {
        setGameStatus(GameStatus.gameOver);
        setWinner(leftDiagonalResultArray[0].value);
        setH1Title(H1Title.playerWon)
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
      setH1Title(H1Title.draw)
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
    if (!field.disabled && turn === Turn.playerOne) {
      field.value = turn;
      setBoard({ ...board });
      setTurn(Turn.playerTwo);
      setClickedFieldClass(ClickedFieldClassArgument.firstPlayer);
      checkIfWonOrDrawAndSetGameStatus();
    } else if (!field.disabled && turn === Turn.playerTwo) {
      field.value = turn;
      setBoard({ ...board });
      setTurn(Turn.playerOne);
      setClickedFieldClass(ClickedFieldClassArgument.secondPlayer);
      checkIfWonOrDrawAndSetGameStatus();
    }
  };

  const makeMoveAndChangeTurn = (fieldId) => {
    if (gameStatus === GameStatus.inProgress) {
      move(fieldId);
    } else if (gameStatus === GameStatus.draw) {
      showDraw();
    } else {
      showWinner();
    }
  };
  const showDraw = () => {};
  const showWinner = () => {};

  const changeFirstPlayerName = event => {
    setFirstPlayerName(event.target.value)
  }

  const changeSecondPlayerName = event => {
    setSecondPlayerName(event.target.value)
  }

  const checkIfPlayersNamesAndStartGame = () => {
    if (firstPlayerName !== "" && secondPlayerName !== "") {
      setH1Title(H1Title.game)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.board}>
        {Object.keys(board).map((singleRowKey) => (
          <Row
            key={singleRowKey}
            rowOfFields={board[singleRowKey]}
            makeMoveAndChangeTurn={makeMoveAndChangeTurn}
            clickedFieldClassArgument={clickedFieldClassArgument}
          />
        ))}
      </div>
      <div className={styles.infoBox}>
        <h1>{h1Title}</h1>
        <p>Player 1:</p>
        <input onChange={changeFirstPlayerName} value={firstPlayerName}></input>
        <p>Player 2:</p>
        <input onChange={changeSecondPlayerName} value={secondPlayerName}></input>
        <button onClick={checkIfPlayersNamesAndStartGame}>Play</button>
      </div>
    </div>
  );
};

export default Board;
