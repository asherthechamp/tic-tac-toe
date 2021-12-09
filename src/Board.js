import React, { useState, useEffect } from "react";
import Box from "./Box";

function Board() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [nextPlayer, setNextPlayer] = useState("O");
  const [announceWinner, setAnnounceWinner] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    checkWinner();
  });
  let boxes = (
    <div className="grid">
      {board.map((val, i) => (
        <Box key={i} value={board[i]} onClick={() => handleClick(i)} />
      ))}
    </div>
  );

  function handleClick(i) {
    if (!gameEnded) {
      if (board[i] === "") {
        setBoard(() => {
          const newBoard = [...board];
          newBoard.splice(i, 1, nextPlayer);
          return newBoard;
        });
      }
      setNextPlayer((p) => np(p));
    }
  }

  function checkWinner() {
    const winningValues = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winningValues.forEach((element) => {
      const [a, b, c] = element;
      if (
        board[a] !== "" &&
        board[b] !== "" &&
        board[c] !== "" &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        setAnnounceWinner(
          () => (
            <div>
              <blink>
                <h1>GAME OVER!</h1>
              </blink>
            </div>
          ),
          () => console.log(announceWinner)
        );
        setGameEnded(() => true);
        setNextPlayer(() => "");
      }
    });
  }

  function handleRestart() {
    setBoard(() => {
      setGameEnded(() => {
        setNextPlayer(() => "O");
        setAnnounceWinner(() => null);
        return false;
      });
      return ["", "", "", "", "", "", "", "", ""];
    });
  }

  function np(p) {
    if (p === "O") return "X";
    else return "O";
  }

  return (
    <div className="container">
      <h1>TIC-TAC-TOE</h1>
      <div>{boxes}</div>
      <div className="announce-winner">{announceWinner}</div>
      <button onClick={handleRestart} className="btn">
        {!gameEnded ? "RESET" : "PLAY AGAIN"}
      </button>
    </div>
  );
}

export default Board;
