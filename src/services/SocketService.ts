import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class SocketService {
  public socket: Socket | null = null;

  public connect(
    url: string = ""
  ): Promise<Socket<DefaultEventsMap, DefaultEventsMap> | undefined> {
    return new Promise((resolve, reject) => {
      this.socket = io(url);

      if (!this.socket) return reject();

      this.socket.on("connect", () => {
        resolve(this.socket as Socket);
      });

      this.socket.on("connect_error", (err) => {
        console.log("Connection error: ", err);
        reject(err);
      });
    });
  }
}
