'use client'

import styles from '@/styles/ui/Chatting.module.css';
import { Chat, UserData } from '@/types';
import axios from 'axios';
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
  const [writer, setWriter] = useState<UserData>();

  useEffect(() => {
    if (chatData) {
      setTextList(chatData.content.split(new RegExp(`(${highlightWord})`, 'gi')));
    }
  }, [highlightWord]);

  useEffect(() => {
    axios.get(`/api/user?email=${chatData.writer}`).then((res) => {
      setWriter(res.data);
    });
  }, []);

  const onClickProfile = () => {
    router.push(`/profile/${writer?._id}`);
  }

  const onClickChat = () => {
    if (url) {
      router.push(url);
    }
  }

  return (
    <div className={`${styles.container} ${isOtherChat ? styles.otherChatContainer : ''}`}>
      {
        isOtherChat ? (
          <>
            <section className={styles.profile}>
              <img src={writer?.image || "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"} className={styles.profileImage} />
            </section>
  
            <section className={styles.chatContainer}>
              <p className={styles.name}>{writer?.name}</p>
              <p className={`${styles.chat} ${isOtherChat ? styles.otherChat : ''} ${url ? styles.url : ""}`} onClick={onClickChat}>
                {
                  textList.map((item, idx) => {
                    return <span key={idx} className={item.toLowerCase() === highlightWord?.toLowerCase() ? styles.highlight : ''}>{item}</span>
                  })
                }
              </p>
            </section>
          </>
        )
        :
        (
          <>
            <section className={styles.chatContainer}>
              <p className={`${styles.chat} ${isOtherChat ? styles.otherChat : ''} ${url ? styles.url : ""}`} onClick={onClickChat}>
                {
                  textList.map((item, idx) => {
                    return <span key={idx} className={item.toLowerCase() === highlightWord?.toLowerCase() ? styles.highlight : ''}>{item}</span>
                  })
                }
              </p>
            </section>
          </>
        )
      }
    </div>
  );
}