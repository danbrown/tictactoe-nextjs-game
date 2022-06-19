import { JoinRoom } from "../components/JoinRoom";
import { Game } from "../components/GameRoom";
import { useGame } from "../game/GameContext";
import { useEffect } from "react";

function App() {
  const { isInRoom, setInRoom } = useGame();

  useEffect(() => {
    setInRoom(false);
  }, []);

  return (
    <div>
      <h1>Welcome to Tic-Tac-Toe</h1>
      <section>
        <JoinRoom />
      </section>
    </div>
  );
}

export default App;
