import { useRouter } from "next/router";
import { useState } from "react";
import { useGame } from "../game/GameContext";
import gameService from "../services/gameService";

interface IJoinRoomProps {}

export function JoinRoom(props: IJoinRoomProps) {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setJoining] = useState(false);

  const router = useRouter();

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    router.push(`/room/${roomName}`);
  };

  return (
    <div>
      <h4>Enter Room ID to Join the Game</h4>
      <input
        placeholder="Room ID"
        value={roomName}
        onChange={handleRoomNameChange}
      />
      <button type="submit" disabled={isJoining} onClick={joinRoom}>
        {isJoining ? "Joining..." : "Joing"}
      </button>
    </div>
  );
}
