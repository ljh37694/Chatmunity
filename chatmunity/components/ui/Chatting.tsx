'use client'

import styles from '@/styles/ui/Chatting.module.css';
import { Chat } from '@/types';
import { useRouter } from 'next/navigation';

interface Props {
  chatData: Chat,
  isOtherChat: boolean,
  url?: string,
}

export default function Chatting(props: Props) {
  const { chatData, isOtherChat, url } = props;

  const router = useRouter();

  return (
    <div className={`${styles.chat} ${isOtherChat ? styles.otherChat : ''} ${url ? styles.url : ""}`} onClick={() => {
      if (url) {
        router.push(url);
      }
    }}>
      <p className={styles.content}>{chatData.content}</p>
    </div>
  );
}