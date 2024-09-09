'use client'

import { useState } from 'react';
import styles from './ChattingRoom.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Chat {
  content: string,
}

export default function ChattingRoom() {
  const [chatList, setChatList] = useState<Chat[]>([]);

  return (
    <>
      <nav className={styles.topNav}>
        <div className={styles.box}></div>
        <h3 className={styles.title}>어쩌고 저쩌구</h3>
        <div className={styles.box}>
          <label className={styles.searchBtn}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>
        </div>
      </nav>

      <section className={styles.postContainer}>
        {chatList.map((item, idx) => {
          return (
            <div className={`${styles.post} ${idx % 2 === 0? styles.hotPost : ''}`} key={idx}>
              <p>{item.content}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}