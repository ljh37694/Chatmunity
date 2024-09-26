import styles from '@/styles/common/ChattingRoom/Chatting.module.css';

interface Props {
  isWriter?: boolean,
  text: string,
}

export default function Chatting(props: Props) {
  return (
    <div className={`${styles.post} ${props.isWriter ? styles.hotPost : ''}`}>
      <p className={styles.content}>{props.text}</p>
    </div>
  );
}