import { Server } from "socket.io";
import { mainController } from "./controllers/mainController";
import { roomController } from "./controllers/roomController";
import { gameController } from "./controllers/gameController";

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // From main controller
  mainController(io);

  // From room controller
  roomController(io);

  // From game controller
  gameController(io);

  return io;
};
