'use client'

import styles from '@/styles/ui/Comment.module.css';
import { Chat } from '@/types';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import ReplyInput from './ReplyInput';
import axios from 'axios';

interface Props {
  session: Session | null,
  data: Chat,
}

export default function Comment(props: Props) {
  const { data, session } = props;

  const [showReply, setShowReply] = useState(false);
  const [replyChatList, setReplyChatList] = useState<Chat[]>([]);

  const onClickContent = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    setShowReply(!showReply);
  }

  const func = (chat: Chat): void => {
    setReplyChatList([...replyChatList, chat]);
  }

  useEffect(() => {
    axios.get('/api/replyChat?root_chat=' + data._id)
      .then((res) => {
        setReplyChatList(res.data);
      })
      .catch(e => console.log(e));
  }, []);

  // 글작성자 == 댓글 작성자
  return (
      <section className={styles.container}>
        <div className={styles.rootChat}>
          <div className={styles.chatContainer}>
            <p className={`${styles.name} ${data.writer === data.email ? styles.writerName : ''}`}>{data.writer === data.email ? '작성자' : data.name}</p>
            <p className={styles.content} onClick={onClickContent}>{data.content}</p>
          </div>
          <p className={styles.date}>{new Date(data.date as string).getFullYear()}</p>
        </div>

        <div className={styles.replyContainer}>
          {showReply ? <ReplyInput data={data} session={session} rootChatId={data._id?.toString() as string} callback={func} /> : null}

          {replyChatList.map((item, idx) => {
            return (
              <div className={`${styles.chatContainer} ${styles.replyChat}`} key={idx}>
                <p className={`${styles.name} ${item.writer === item.email ? styles.writerName : ''}`}>{item.writer === item.email ? '작성자' : item.name}</p>
                <p className={styles.content} onClick={onClickContent}>{item.content}</p>
              </div>
            );
          })}
        </div>
      </section>
  );
}