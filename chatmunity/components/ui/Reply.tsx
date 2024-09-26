import styles from '@/styles/ui/Reply.module.css';
import Button from '../common/Button';

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  className?: string,
}

export default function Reply(props: Props) {
  return (
    <div className={`${styles.container} ${props.className}`}>
      <form className={styles.form}>
        <textarea rows={3} cols={200} className={styles.commentInput} />
        <Button text='대댓글' type='submit' className={styles.btn} />
      </form>
    </div>
  );
}