'use client'

import { useState } from 'react';
import Button from './Button';
import styles from './Comments.module.css';
import { Chat } from '@/types';

export default function Comments() {
  const chatList: string[] = [
    'asdfasdf',
    'asdfasdf',
    'asdfasdf',
    'asdfasdf',
    'asdfasdf',
    'asdfasdf',
    'asdfasdf',
    'asdfasdf',
    'asdfasdf',
    'asdfasdf',
  ];

  const curDate = new Date();
  const imgUrl = 'https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800';

  const [showBtn, setShowBtn] = useState(false);

  return (
    <div className={styles.container}>
      <section className={styles.write}>
        <img src={imgUrl} className={styles.userImg} />
        <div className={styles.inputContainer}>
          <input onFocus={() => setShowBtn(true)} placeholder='댓글 쓰기...' className={styles.chatInput} />
          {
            showBtn ?
            <div className={styles.btnContainer}>
              <Button onClick={() => setShowBtn(false)} className={styles.cancleBtn} text='취소' />
              <Button text='댓글' />
            </div> : null
          }

        </div>
      </section>

      {chatList.map((item, idx) => {
        return (
          <section className={styles.chat} key={idx}>
            <p className={styles.nickname}>이름</p>
            <p className={styles.content}>{item}</p>
            <p className={styles.date}>{curDate.getFullYear()}</p>
          </section>
        );
      })}
    </div>
  );
}