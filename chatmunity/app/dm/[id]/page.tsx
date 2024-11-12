'use client'

import styles from './page.module.css';
import { Chat, Dm, DmRoom, UserData } from '@/types';
import ChattingRoom from '@/components/common/ChattingRoom';
import ChattingList from '@/components/common/ChattingList';
import DmInput from '@/components/ui/DmInput';
import Chatting from '@/components/ui/Chatting';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { socket } from '@/socket';
  
interface Props {
  params: {
    id: string,
  }
}

export default function DmPage(props: Props) {
  const { params: { id: roomId } } = props;
  
  const { data: session } = useSession();

  const [dmList, setDmList] = useState<Dm[]>([]);
  const [dmRoomData, setDmRoomData] = useState<DmRoom>();
  const [otherUser, setOtherUser] = useState<UserData>();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.get(`/api/dm?room_id=${roomId}&count=${0}`)
      .then((res) => {
        const list: Dm[] = res.data;
        setDmList(list.reverse());
      })
      .catch(e => console.log(e));

    axios.get('/api/dmRoom?room_id=' + roomId)
      .then((res) => {
        setDmRoomData(res.data);
        setOtherUser(res.data?.member[0].email === session?.user?.email ? res.data?.member[1] as UserData : res.data?.member[0] as UserData)
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    if (socket.connected) {
      socket.emit('joinRoom', roomId);

      socket.on("message", (msg: Dm) => {
        console.log(msg);
        setDmList((prev) => [...prev, msg]);
      });
    }

    return () => {
      socket.off('message');

      socket.on("disconnect", () => {
        console.log('끝남');
      });
    }
  }, []);

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <ChattingRoom title={otherUser?.name as string}>
            <p>Status: { isConnected ? "connected" : "disconnected" }</p>
            <p>Transport: { transport }</p>
      <ChattingList inputComp={<DmInput roomId={roomId} session={session} setDmList={setDmList} />}>
        {
          dmList.map((item, idx) => {
            const data: Chat = {
              ...item,
              _id: item._id?.toString(),
            }

            return (
              <Chatting chatData={data} isOtherChat={item.writer !== session?.user?.email} key={idx} />
            );
          })
        }
        <div ref={bottomRef}></div>
      </ChattingList>
    </ChattingRoom>
  );
}