'use client'

import styles from '@/styles/layout/DmRoom.module.css';
import ChattingRoom from '../common/ChattingRoom';
import Chatting from '../ui/Chatting';
import Input from '../common/Input';
import { Dm } from '@/types';
import { Session } from 'next-auth';
import { useState } from 'react';

interface Props {
  dmList: Dm[],
  title: string,
  session: Session | null,
}

export default function DmRoom(props: Props) {
  const { title, dmList, session } = props;

  const [text, setText] = useState<string>('');

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
      }} />
      </ChattingRoom>
    </div>

  )
}