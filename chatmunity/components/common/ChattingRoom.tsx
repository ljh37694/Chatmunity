'use client'

import styles from '@/styles/common/ChattingRoom.module.css';

interface ChattingRoomProps {
  children: React.ReactNode,
  title: string,
  className?: string,
}

export default function ChattingRoom (props: ChattingRoomProps) {
  const { title } = props;

  return (
    <section className={`${styles.container} ${props.className}`}>
      <div className={styles.header}>
        <h2>{title}</h2>
      </div>

      <div className={styles.content}>
        { props.children }
      </div>
    </section>
  );
}