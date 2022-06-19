import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useGame } from "../game/GameContext";
import gameService from "../services/gameService";

export type IPlayMatrix = Array<Array<string | null>>;
export interface IStartGame {
  start: boolean;
  symbol: "x" | "o";
}

export function Game() {
  const [matrix, setMatrix] = useState<IPlayMatrix>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const {
    socket,
    playerSymbol,
    setPlayerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
  } = useGame();

  const checkGameState = (matrix: IPlayMatrix) => {
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[i][j]);
      }

      if (row.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (row.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let column = [];
      for (let j = 0; j < matrix[i].length; j++) {
        column.push(matrix[j][i]);
      }

      if (column.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (column.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    if (matrix[1][1]) {
      if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }

      if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }
    }

    //Check for a tie
    if (matrix.every((m) => m.every((v) => v !== null))) {
      return [true, true];
    }

    return [false, false];
  };

  const updateGameMatrix = (column: number, row: number, symbol: "x" | "o") => {
    const newMatrix = [...matrix];

    if (newMatrix[row][column] === null || newMatrix[row][column] === "null") {
      newMatrix[row][column] = symbol;
      setMatrix(newMatrix);
    }

    if (socket) {
      gameService.updateGame(socket, newMatrix);
      const [currentPlayerWon, otherPlayerWon] = checkGameState(newMatrix);
      if (currentPlayerWon && otherPlayerWon) {
        gameService.gameWin(socket, "The Game is a TIE!");
        alert("The Game is a TIE!");
      } else if (currentPlayerWon && !otherPlayerWon) {
        gameService.gameWin(socket, "You Lost!");
        clearGame();
        // alert("You Won!");
      }

      setPlayerTurn(false);
    }
  };

  const clearGame = () => {
    setMatrix([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    // setGameStarted(false);
  };

  const handleGameUpdate = () => {
    if (socket)
      gameService.onGameUpdate(socket, (newMatrix) => {
        setMatrix(newMatrix);
        checkGameState(newMatrix);
        setPlayerTurn(true);
      });
  };

  const handleGameStart = () => {
    if (socket)
      gameService.onStartGame(socket, (options) => {
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
      });
  };

  const handleGameWin = () => {
    if (socket)
      gameService.onGameWin(socket, (message) => {
        console.log("Here", message);
        alert(message);
        clearGame();
      });
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  }, []);

  return (
    <div>
      {!isGameStarted && (
        <h2>Waiting for Other Player to Join to Start the Game!</h2>
      )}

      {isGameStarted && isPlayerTurn && <h2>Your Turn!</h2>}

      {isGameStarted && !isPlayerTurn && <h2>Other player turn</h2>}

      {isGameStarted && (
        <p>
          Your Symbol: <span>{playerSymbol}</span>
        </p>
      )}

      {matrix.map((row, rowIdx) => {
        return (
          <div
            style={{
              display: "flex",
            }}
          >
            {row.map((column, columnIdx) => (
              <button
                style={{
                  width: "10em",
                  height: "10em",
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1px",
                  backgroundColor: column
                    ? column === "x"
                      ? "red"
                      : "blue"
                    : "transparent",
                  border: `2px solid ${isPlayerTurn ? "lime" : "transparent"}`,
                }}
                onClick={() =>
                  isPlayerTurn &&
                  updateGameMatrix(columnIdx, rowIdx, playerSymbol)
                }
              >
                {column && column !== "null"
                  ? column === "x"
                    ? "X"
                    : "O"
                  : null}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}
