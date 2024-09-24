'use client'

import { FormEvent, useEffect, useState } from 'react';
import Button from './Button';
import styles from '@/styles/common/CommentList.module.css';
import { Chat } from '@/types';
import axios from 'axios';
import { Session } from 'next-auth';
import Comment from '../ui/Comment';

interface Props {
  postId: string,
  session: Session | null,
}

export default function CommentList(props: Props) {
  useEffect(() => {
    axios.get('/api/chat?post_id=' + props.postId)
      .then((res) => {
        setChatList(res.data);
      })
      .catch(e => console.log(e));
  }, []);

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [text, setText] = useState<string>('');

  const imgUrl = 'https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800';

  const [showBtn, setShowBtn] = useState(false);
  
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!props.session?.user) {
      alert('댓글을 작성하려면 로그인을 해주십시오');
    } else {
      const chat: Chat = {
        content: text,
        date: new Date().toString(),
        email: props.session?.user!.email as string,
        post_id: props.postId,
        name: props.session.user.name as string,
      }
      
      axios.post('/api/chat', chat)
        .then((res) => {
          console.log(res.data);
          setChatList([...chatList, chat]);
          setText('');
        });
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.write}>
        <img src={props.session?.user?.image ? props.session.user.image : imgUrl} className={styles.userImg} />
        <form onSubmit={onSubmit} className={styles.inputContainer}>
          <input onFocus={() => setShowBtn(true)} onInput={(e) => setText(e.currentTarget.value)} value={text} placeholder='댓글 쓰기...' className={styles.chatInput} />
          {
            showBtn ?
            <div className={styles.btnContainer}>
              <Button onClick={(e) => {setShowBtn(false); setText('')}} className={styles.cancleBtn} text='취소' />
              <Button type='submit' text='댓글' />
            </div> : null
          }
        </form>
      </section>

      {chatList.map((item, idx) => {
        return (
          <Comment key={idx} data={item} session={props.session} />
        );
      })}
    </div>
  );
}