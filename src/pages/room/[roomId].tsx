import { JoinRoom } from "../../components/JoinRoom";
import { Game } from "../../components/GameRoom";
import { useGame } from "../../game/GameContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import e from "cors";
import gameService from "../../services/gameService";

function App() {
  const { socket, isInRoom, setInRoom } = useGame();
  const router = useRouter();
  const [roomId, setRoomId] = useState<string>("");

  useEffect(() => {
    if (router.query.roomId && socket) {
      setInRoom(true);
      setRoomId(router.query.roomId as string);
      joinRoom(router.query.roomId as string);
    }
  }, [socket, router]);

  const [isJoining, setJoining] = useState(false);
  const joinRoom = async (rID: string) => {
    if (!rID || rID.trim() === "" || !socket) return;

    setJoining(true);

    const joined = await gameService.joinGameRoom(socket, rID).catch((err) => {
      alert(err);
    });

    setJoining(false);

    if (joined) {
      setInRoom(true);
    }
  };

  return (
    <div>
      <h1>Welcome to Tic-Tac-Toe</h1>
      <p>Room: {roomId}</p>
      {isJoining && <p>Loading...</p>}
      <section>{isInRoom && <Game />}</section>
    </div>
  );
}

export default App;
