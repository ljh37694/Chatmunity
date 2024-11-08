'use client'

import { SocketIoProvider } from "@/components/provider/SocketIoProvider";
import { SessionProvider } from "next-auth/react";

export default function DmLayout({ children }: { children: Readonly<React.ReactNode> }) {
  return (
    <SessionProvider>
      <SocketIoProvider>
        {children}
      </SocketIoProvider>
    </SessionProvider>
  )
}