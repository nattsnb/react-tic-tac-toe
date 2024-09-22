import styles from "./intro.module.css";
import { useState } from "react";
import Board from "../Board";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";

const Intro = () => {
  const [firstPlayerName, setFirstPlayerName] = useState("");
  const [secondPlayerName, setSecondPlayerName] = useState("");
  const [showBoard, setShowBoard] = useState(false);
  const [isIntroOn, setIsIntroOn] = useState(styles.introWrapperOn);
  const [isBoardOn, setIsBoardOn] = useState(styles.boardWrapperOff);

  const changeFirstPlayerName = (event) => {
    setFirstPlayerName(event.target.value);
  };

  const changeSecondPlayerName = (event) => {
    setSecondPlayerName(event.target.value);
  };

  const checkIfPlayersNamesAndStartGame = () => {
    if (firstPlayerName !== "" && secondPlayerName !== "") {
      console.log(firstPlayerName + secondPlayerName);
      setIsIntroOn(styles.introWrapperOff);
      setIsBoardOn(styles.boardWrapperOn);
    }
  };
  return (
    <>
      <div className={isIntroOn}>
        <h1>Provide Players:</h1>
        <p>Player 1:</p>
        <input
          onChange={changeFirstPlayerName}
          value={firstPlayerName}
          placeholder={"Name"}
        ></input>
        <p>Player 2:</p>
        <input
          onChange={changeSecondPlayerName}
          value={secondPlayerName}
          placeholder={"Name"}
        ></input>
        <button
          className={styles.playButton}
          onClick={checkIfPlayersNamesAndStartGame}
        >
          Play
        </button>
      </div>
      <div className={isBoardOn}>
        <Board
          firstPlayerName={firstPlayerName}
          secondPlayerName={secondPlayerName}
        />
      </div>
    </>
  );
};

export default Intro;
