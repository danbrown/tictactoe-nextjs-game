import cors from "cors";
import express, { Express, Request, Response } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";
import socketServer from "./socket";
import { normalizePort } from "./utils";
import path from "path";

const port: number = normalizePort(process.env.PORT || "9000");
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app: Express = express();
  app.set("port", port);

  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(cors());

  const server: http.Server = http.createServer(app);
  const io: socketio.Server = socketServer(server);
  // io.attach(server);

  app.get("/hello", async (_: Request, res: Response) => {
    res.send("Hello World");
  });

  app.all("*", (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
