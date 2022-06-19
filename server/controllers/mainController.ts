import { Socket, Server } from "socket.io";

export const mainController = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("New Socket connected: ", socket.id);

    socket.on("custom_event", (data: any) => {
      console.log("Data: ", data);
    });
  });
};
