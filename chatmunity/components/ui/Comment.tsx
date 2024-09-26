'use client'

import styles from '@/styles/ui/Comment.module.css';
import { Chat } from '@/types';
import { Session } from 'next-auth';
import Reply from './Reply';
import { useState } from 'react';

interface Props {
  session: Session | null,
  data: Chat,
}

export default function Comment(props: Props) {
  const { data: item, session } = props;
  const username = session?.user?.name;

  const [showReply, setShowReply] = useState(false);

  const onClickContent = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    setShowReply(!showReply);
  }

  return (
      <section className={styles.container}>
        <div className={styles.rootChat}>
          <p className={`${styles.name} ${username === item.name ? styles.writerName : ''}`}>{username === item.name ? '작성자' : item.name}</p>
          <p className={styles.content} onClick={onClickContent}>{item.content}</p>
          <p className={styles.date}>{new Date(item.date as string).getFullYear()}</p>
        </div>
        { showReply ? <Reply /> : null}
      </section>
  );
}