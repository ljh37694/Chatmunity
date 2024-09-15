'use client'

import { useState } from 'react';
import { Profile } from '@/types';
import styles from '@/styles/layout/FriendsPanel.module.css';

export default function Friend(props: { data: Profile }) {
  const { img, name } = props.data;

  const [status, setStatus] = useState<number>(0);

  const statusList: string[] = ['online', 'offline', 'away'];

  return (
    <label className={styles.friend}>
      <div className={styles.profile}>
        <img src={img} />
        <div onClick={() => setStatus((status + 1) % statusList.length)}  className={`${styles.statusCircle} ${styles[statusList[status]]}`}></div>
      </div>
      
      <p>{name}</p>
    </label>
  );
}