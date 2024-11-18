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
    // axios로 message list 가져오기
    axios.get(`/api/dm?room_id=${roomId}&count=${0}`)
      .then((res) => {
        const list: Dm[] = res.data;
        setDmList(list.reverse());
      })
      .catch(e => console.log(e));

    // axios로 다른 유저 정보 가져오기
    axios.get('/api/dmRoom?room_id=' + roomId)
      .then((res) => {
        setDmRoomData(res.data);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    setOtherUser(dmRoomData?.member[0].email === session?.user?.email ? dmRoomData?.member[1] as UserData : dmRoomData?.member[0] as UserData);
  }, [dmRoomData]);

  // socket io
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dmList]);

  return (
    <ChattingRoom title={otherUser?.name as string}>
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