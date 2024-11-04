import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { ServerToClientEvents } from "@/types/socket";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer<ServerToClientEvents>
    }
  }
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    console.log("Setting up Socket.IO server...");
    const httpServer: NetServer = res.socket.server as any;
    const io = new Server(httpServer, { 
      path: "/api/socket",
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("message", (message) => {
        // 받은 메시지를 모든 클라이언트에 브로드캐스트
        io.emit("message", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  } else {
    console.log("Socket.IO server already running");
  }
  res.end();
};

export default SocketHandler;
