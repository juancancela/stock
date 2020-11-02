require("dotenv").config();
import * as express from "express";
import * as socketIo from "socket.io";
import * as cors from "cors";
import { createServer, Server } from "http";
import { ApplicationEvents } from "../utils/ApplicationEvents";
import { Message } from "../types";
import Bot from "../bot";
const { CONNECTION, MESSAGE, DISCONNECTION } = ApplicationEvents;
const { PORT } = process.env;
const log = console.log;

export class SocketChat {
  private application: express.Application;
  private bot: Bot;
  private server: Server;
  private socketIO: SocketIO.Server;
  private port: number;

  constructor() {
    this.application = express();
    this.port = parseInt(PORT) || 8080;
    this.application.options("*", cors());
    this.application.use(cors());
    this.server = createServer(this.application);
    this.initSocket();
    this.listen();
    this.bot = new Bot();
  }

  private initSocket(): void {
    this.socketIO = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () =>
      log(`Server is running on port: ${this.port}`)
    );

    this.socketIO.on(CONNECTION, (socket: any) => {
      log(`Client connected on port: ${this.port}.`);

      socket.on(MESSAGE, async (msg: Message) => {
        log(`[socket-chat](message): ${JSON.stringify(msg)}`);
        msg.timestamp = new Date();
        this.socketIO.emit(ApplicationEvents.MESSAGE, msg);

        try {
          const parsedMessage = await this.bot.run(msg);
          if (parsedMessage) {
            const response = await this.bot.getData(parsedMessage);
            const message = this.bot.getMessage(response.data);
            this.socketIO.emit(ApplicationEvents.MESSAGE, message);
          }
        } catch (error) {
          this.socketIO.emit(MESSAGE, error);
        }
      });

      socket.on(DISCONNECTION, () => log("Client got disconnected"));
    });
  }

  get app(): express.Application {
    return this.application;
  }
}
