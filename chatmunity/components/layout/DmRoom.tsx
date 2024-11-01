'use client'

import styles from '@/styles/layout/DmRoom.module.css';
import ChattingRoom from '../common/ChattingRoom';
import Chatting from '../ui/Chatting';
import Input from '../common/Input';
import { Dm } from '@/types';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  dmList: Dm[],
  title: string,
  session: Session | null,
  roomId: string,
}

export default function DmRoom(props: Props) {
  const { title, dmList, session, roomId } = props;

  const [text, setText] = useState<string>('');
  useEffect(() => {
    axios.get()
  }, []);

  return (
    <div>
      <ChattingRoom title={title}>
      {
        dmList.map((item, idx) => {
          return (
            <Chatting chatData={item} isWriter={item.writer === session?.user?.email} key={idx} />
          );
        })
      }

      <Input buttonText='보내기' textState={text} setText={setText} onSubmit={(e) => {
        e.preventDefault();

        const dm: Dm =  {
          writer: session?.user?.email as string,
          content: text,
          date: new Date().toString(),
          name: session?.user?.name as string,
          room_id: roomId,
        }

        axios.post('/api/dm', dm)
          .then((res) => {
            console.log(res);
          })
          .catch(e => console.log(e));
      }} />
      </ChattingRoom>
    </div>

  )
}