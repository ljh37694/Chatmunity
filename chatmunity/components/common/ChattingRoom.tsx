import styles from '@/styles/common/ChattingRoom.module.css';
import { Chat } from '@/types';

interface ChattingRoomProps {
  chatList: Chat[],
  children: React.ReactNode,
}

export default function ChattingRoom (props: ChattingRoomProps) {
  return (
    <section className={styles.container}>
      { props.children }
    </section>
  );
}