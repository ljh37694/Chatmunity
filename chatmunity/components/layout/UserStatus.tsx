'use client';

import { socket } from '@/socket';
import { Session } from 'next-auth';
import { useEffect } from 'react';

interface Props {
  session: Session | null;
}

export default function UserStatus({ session }: Props) {
  useEffect(() => {
    socket.auth = {
      userId: session?.user?.email as string
    };

    socket.emit('userStatus', session?.user?.email as string, 'online');

    return () => {
      socket.off('userStatus');
    }
  }, []);

  return (
    <div></div>
  );
}