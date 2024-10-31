import styles from '@/styles/ui/Chatting.module.css';
import { Chat } from '@/types';

interface Props {
  chatData: Chat,
  isWriter: boolean,
}

export default function Chatting(props: Props) {
  const { chatData, isWriter } = props;

  return (
    <div className={`${styles.chat} ${isWriter ? styles.otherChat : ''}`}>
      <p className={styles.content}>{chatData.content}</p>
    </div>
  );
}