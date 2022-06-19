import React from "react";
import { JoinRoom } from "../components/JoinRoom";
import { Game } from "../components/GameRoom";
import { useGame } from "../game/GameContext";

function App() {
  const { isInRoom } = useGame();

  return (
    <div>
      <h1>Welcome to Tic-Tac-Toe</h1>
      <section>
        {!isInRoom && <JoinRoom />}
        {isInRoom && <Game />}
      </section>
    </div>
  );
}

export default App;
