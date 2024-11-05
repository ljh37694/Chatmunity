'use client'

import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function SocketProvider({ children }: Readonly<{ children: React.ReactNode}>) {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("", {
      path: '/api/socket',
      addTrailingSlash: false,
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('connect_error', (error: Error) => {
      console.log(error);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
}