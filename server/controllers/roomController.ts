import { Server, Socket } from "socket.io";

export const roomController = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("join_game", (data: any) => {
      console.log("New User joining room: ", data);

      const connectedSockets = io.sockets.adapter.rooms.get(data.roomId);
      const socketRooms = Array.from(socket.rooms.values()).filter(
        (room) => room !== socket.id
      );

      if (
        socketRooms.length > 0 ||
        (connectedSockets && connectedSockets.size === 2)
      ) {
        socket.emit("room_join_error", {
          error: "Room is full please choose another room to play!",
        });
      } else {
        socket.join(data.roomId);
        socket.emit("room_joined");

        if (io.sockets.adapter.rooms.get(data.roomId).size === 2) {
          socket.emit("start_game", { start: true, symbol: "x" });
          socket

            .to(data.roomId)
            .emit("start_game", { start: false, symbol: "o" });
        }
      }
    });
  });
};

// get a room with 1 player
const getRoomWithPlayer = (io: Socket) => {
  const socketRooms = Array.from(io.rooms.values()).filter((r) => r !== io.id);

  return socketRooms && socketRooms[0];
};
