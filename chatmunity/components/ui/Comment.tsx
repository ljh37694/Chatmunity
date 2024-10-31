'use client'

import styles from '@/styles/ui/Comment.module.css';
import { Chat, CommentType, Post } from '@/types';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import ReplyInput from './ReplyInput';
import axios from 'axios';

interface Props {
  session: Session | null,
  commentData: CommentType,
  postData: Post,
}

export default function Comment(props: Props) {
  const { commentData, postData, session } = props;

  const [showReply, setShowReply] = useState(false);
  const [replyChatList, setReplyChatList] = useState<Chat[]>([]);

  const onClickContent = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    setShowReply(!showReply);
  }

  const func = (chat: Chat): void => {
    setReplyChatList([...replyChatList, chat]);
  }

  useEffect(() => {
    axios.get('/api/replyChat?root_chat=' + commentData._id)
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
            <p className={`${styles.name} ${postData.writer === commentData.writer ? styles.writerName : ''}`}>{postData.writer === commentData.writer ? '작성자' : commentData.name}</p>
            <p className={styles.content} onClick={onClickContent}>{commentData.content}</p>
          </div>
          <p className={styles.date}>{new Date(commentData.date as string).getFullYear()}</p>
        </div>

        <div className={styles.replyContainer}>
          {showReply ? <ReplyInput data={commentData} session={session} rootChatId={commentData._id?.toString() as string} callback={func} /> : null}

          {replyChatList.map((item, idx) => {
            return (
              <div className={`${styles.chatContainer} ${styles.replyChat}`} key={idx}>
                <p className={`${styles.name} ${postData.writer === item.writer ? styles.writerName : ''}`}>{postData.writer === item.writer ? '작성자' : item.name}</p>
                <p className={styles.content} onClick={onClickContent}>{item.content}</p>
              </div>
            );
          })}
        </div>
      </section>
  );
}