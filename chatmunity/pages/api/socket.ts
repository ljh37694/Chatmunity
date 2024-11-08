import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { Socket } from 'net';
import type { NextApiRequest, NextApiResponse } from "next";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from "@/types/socket";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer<ClientToServerEvents, ServerToClientEvents>
    }
  }
}

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (!res.socket.server.io) {
    console.log("Setting up Socket.IO server...");

    const httpServer: NetServer = res.socket.server as NetServer;

    const io = new SocketIOServer(httpServer, { 
      path: "/api/socket",
      addTrailingSlash: false,
      transports: ["websocket"],
    });
    res.socket.server.io = io;
  } else {
    console.log("Socket.IO server already running");
  }
  res.end();
}