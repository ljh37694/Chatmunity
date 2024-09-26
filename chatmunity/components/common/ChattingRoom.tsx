'use client'

import styles from '@/styles/common/ChattingRoom.module.css';
import { Chat } from '@/types';

interface ChattingRoomProps {
  chatList: Chat[],
  children: React.ReactNode,
}

export default function ChattingRoom (props: ChattingRoomProps) {
  return (
    <section className={styles.container}>
      { props.children }
    </section>
  );
}

interface ChattingProps {
  isWriter?: boolean,
  text: string,
}

export function Chatting (props: ChattingProps) {
  return (
    <div className={`${styles.post} ${props.isWriter ? styles.hotPost : ''}`}>
      <p className={styles.content}>{props.text}</p>
    </div>
  );
}