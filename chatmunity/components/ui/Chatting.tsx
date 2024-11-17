'use client'

import styles from '@/styles/ui/Chatting.module.css';
import { Chat } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  chatData: Chat,
  isOtherChat: boolean,
  url?: string,
  highlightWord?: string,
}

export default function Chatting(props: Props) {
  const { chatData, isOtherChat, url, highlightWord } = props;

  const router = useRouter();

  const [textList, setTextList] = useState<string[]>([]);

  useEffect(() => {
    if (chatData && highlightWord) {
      setTextList(chatData.content.split(new RegExp(`(${highlightWord})`, 'gi')));
    }
  }, [highlightWord]);

  return (
    <div className={`${styles.chat} ${isOtherChat ? styles.otherChat : ''} ${url ? styles.url : ""}`} onClick={() => {
      if (url) {
        router.push(url);
      }
    }}>
      <p className={styles.content}>
        {
          textList.map((item, idx) => {
            return <span className={item.toLowerCase() === highlightWord?.toLowerCase() ? styles.highlight : ''}>{item}</span>
          })
        }
      </p>
    </div>
  );
}