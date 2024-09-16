'use client'

import { FormEvent, useEffect, useState } from 'react';
import Button from './Button';
import styles from '@/styles/common/Comments.module.css';
import { Chat } from '@/types';
import axios from 'axios';

interface Props {
  postId: string,
}

export default function Comments(props: Props) {
  useEffect(() => {
    axios.get('/api/chat?post_id=' + props.postId)
      .then((res) => {
        setChatList(res.data);
      })
      .catch(e => console.log(e));
  }, []);

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [text, setText] = useState<string>('');

  const curDate = new Date();
  const imgUrl = 'https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800';

  const [showBtn, setShowBtn] = useState(false);
  
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const chat: Chat = {
      content: text,
      date: new Date().toString(),
      writer: 'karina',
      post_id: props.postId,
    }
    
    axios.post('/api/chat', chat)
      .then((res) => {
        console.log(res.data);
        setChatList([...chatList, chat]);
      })
  }

  return (
    <div className={styles.container}>
      <section className={styles.write}>
        <img src={imgUrl} className={styles.userImg} />
        <form onSubmit={onSubmit} className={styles.inputContainer}>
          <input onFocus={() => setShowBtn(true)} onInput={(e) => setText(e.currentTarget.value)} value={text} placeholder='댓글 쓰기...' className={styles.chatInput} />
          {
            showBtn ?
            <div className={styles.btnContainer}>
              <Button onClick={() => {setShowBtn(false); setText('')}} className={styles.cancleBtn} text='취소' />
              <Button type='submit' text='댓글' />
            </div> : null
          }
        </form>
      </section>

      {chatList.map((item, idx) => {
        return (
          <section className={styles.chat} key={idx}>
            <p className={styles.nickname}>{item.writer}</p>
            <p className={styles.content}>{item.content}</p>
            <p className={styles.date}>{new Date(item.date as string).getFullYear()}</p>
          </section>
        );
      })}
    </div>
  );
}