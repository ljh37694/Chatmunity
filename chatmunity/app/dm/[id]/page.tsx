'use client'

import styles from './page.module.css';
import { Chat, Dm, DmRoom, UserData } from '@/types';
import ChattingRoom from '@/components/common/ChattingRoom';
import ChattingList from '@/components/common/ChattingList';
import DmInput from '@/components/ui/DmInput';
import Chatting from '@/components/ui/Chatting';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSocketIo } from '@/components/provider/SocketIoProvider';
  
interface Props {
  params: {
    id: string,
  }
}

export default function DmPage(props: Props) {
  const { params: { id: roomId } } = props;
  
  const { data: session } = useSession();
  const { socket, isConnected } = useSocketIo();

  const [dmList, setDmList] = useState<Dm[]>([]);
  const [dmRoomData, setDmRoomData] = useState<DmRoom>();
  const [otherUser, setOtherUser] = useState<UserData>();

  useEffect(() => {
    axios.get('/api/dm?room_id=' + roomId)
      .then((res) => {
        setDmList(res.data);
      })
      .catch(e => console.log(e));

    axios.get('/api/dmRoom?room_id=' + roomId)
      .then((res) => {
        setDmRoomData(res.data);
        setOtherUser(res.data?.member[0].email === session?.user?.email ? res.data?.member[1] as UserData : res.data?.member[0] as UserData)
      })
      .catch(e => console.log(e));

    axios.get('/api/join?room_id=' + roomId)
      .then(res => console.log(res.data))
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    socket?.on('message', (msg) => {
      console.log(dmList, msg);

      setDmList((prev) => [...prev, msg]);
    });
  }, [socket]);

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
      </ChattingList>
    </ChattingRoom>
  );
}