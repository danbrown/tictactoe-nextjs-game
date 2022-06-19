import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

class SampleService {
  public async testing(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      socket.emit("testing_answer", { roomId });
      socket.on("testing_answer", (data) => resolve(data));
      socket.on("testing_answer", ({ error }) => reject(error));
    });
  }
}

export default new SampleService();
