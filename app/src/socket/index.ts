import io from "socket.io-client";
import { Message } from "./types";
import { fromEvent, Observable } from "rxjs";

export class SocketApplication {
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init(): SocketApplication {
    this.socket = io("localhost:8080");
    return this;
  }

  public send(message: Message): void {
    console.log("emitting message: " + message);
    this.socket.emit("message", message);
  }

  public onMessage(): Observable<Message> {
    return fromEvent(this.socket, "message");
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}