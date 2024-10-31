'use client'

import styles from '@/styles/common/ChattingRoom.module.css';
import { Chat } from '@/types';
import Input from './Input';
import { useState } from 'react';

interface ChattingRoomProps {
  children: React.ReactNode,
  title: string,
}

export default function ChattingRoom (props: ChattingRoomProps) {
  const { title } = props;

  const [text, setText] = useState<string>('');

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>{title}</h2>
      </div>
      { props.children }
    </section>
  );
}