'use client'

import styles from '@/styles/ui/CommentInput.module.css';
import { Session } from 'next-auth';
import { FormEvent, useState } from 'react';
import Button from '../common/Button';
import { Chat } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
  session: Session | null,
  onSubmit?: (e: React.FormEvent) => void,
  postId: string,
}

export default function CommentInput(props: Props) {
  const { session } = props;

  const router = useRouter();
  const [text, setText] = useState<string>('');
  const [showBtn, setShowBtn] = useState<boolean>(false);

  const imgUrl = 'https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800';

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
        writer: props.session.user.email as string,
        root_chat: null,
      }
      
      axios.post('/api/chat', chat)
        .then((res) => {
          console.log(res.data);
          setText('');
          router.refresh();
        });
    }
  }

  return (
    <section className={styles.write}>
      <img src={session?.user?.image ? session.user.image : imgUrl} className={styles.userImg} />
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
  );
}