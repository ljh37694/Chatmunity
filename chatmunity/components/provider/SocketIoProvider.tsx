'use client'

import { ClientSocketType, ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "@/types/socket";
import { ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import React from "react";

interface SocketIoContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
}

const SocketIoContext = React.createContext<SocketIoContextType>({
  socket: null,
  isConnected: false,
});

export const useSocketIo = () => {
  return useContext(SocketIoContext);
}

export const SocketIoProvider = ({ children }: Readonly<{ children: ReactNode}>) => {
  const [socket, setSocket] = useState<ClientSocketType | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket: ClientSocketType = io('ws://localhost:3000', {
      path: '/api/socket',
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('socket is connected');
      setIsConnected(true);
    });

    socket.on('connect_error', (error: Error) => {
      console.log(error);
    });

    socket.on('disconnect', () => {
      console.log('socket is disconnected');
      setIsConnected(false);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <SocketIoContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketIoContext.Provider>
  );
}