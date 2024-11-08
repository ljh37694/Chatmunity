import { Socket } from "socket.io-client";
import { Dm } from ".";

export interface ServerToClientEvents {
  message: (message: Dm) => void;
}

export interface ClientToServerEvents {
  message: (roomId: string, message: Dm) => void;
  joinRoom: (roomId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
  massage: string;
}

export type ClientSocketType = Socket<ServerToClientEvents, ClientSocketType>;