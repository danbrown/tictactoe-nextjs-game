import { Server, Socket } from "socket.io";

export const gameController = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("update_game", (data: any) => {
      console.log("Data: ", data);

      const gameRoom = getSocketGameRoom(socket);
      socket.to(gameRoom).emit("on_game_update", data);
    });

    socket.on("game_win", (data: any) => {
      console.log("Data: ", data);

      const gameRoom = getSocketGameRoom(socket);
      socket.to(gameRoom).emit("on_game_win", data);
    });
  });
};

// util function to get the game room from the socket
function getSocketGameRoom(io: Socket): string {
  const socketRooms = Array.from(io.rooms.values()).filter((r) => r !== io.id);
  const gameRoom = socketRooms && socketRooms[0];

  return gameRoom;
}
