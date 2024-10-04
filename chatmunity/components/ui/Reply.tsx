'use client'

import styles from '@/styles/ui/Reply.module.css';
import Button from '../common/Button';
import { Chat } from '@/types';
import { Session } from 'next-auth';
import axios from 'axios';
import { EventHandler, useState } from 'react';

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  className?: string,
  rootChat: string,
  session: Session | null,
  data: Chat,
}

export default function Reply(props: Props) {
  const { session, data, rootChat } = props;

  const [text, setText] = useState<string>('');

  const onSubmit = (e: React.FormEvent) => {  
    axios.post('/api/chat', {
      date: new Date().toISOString(),
      content: text,
      email: session?.user?.email as string,
      name: session?.user?.name as string,
      post_id: data.post_id,
      writer: session?.user?.email as string,
      root_chat: rootChat,
    })
      .then((res) => {
        console.log(res.status);
      })
      .catch(e => console.log(e));
  };

  return (
    <div className={`${styles.container} ${props.className}`}>
      <form className={styles.form} onSubmit={onSubmit}>
        <textarea rows={3} cols={200} className={styles.commentInput} value={text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)} />
        <Button text='대댓글' type='submit' className={styles.btn} />
      </form>
    </div>
  );
}