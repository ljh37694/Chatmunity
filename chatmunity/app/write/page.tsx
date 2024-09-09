import Button from '@/components/Button';
import styles from './page.module.css';

export default function Write() {
  return (
    <div>
      <form name='postForm' className={styles.form}>
        <input name='titleInput' className={styles.title} placeholder='제목을 입력해주세요' />
        <textarea placeholder='내용을 입력해주세요' name='content' className={styles.content} rows={28} cols={100}></textarea>
        <Button className={styles.button} type="submit" text='글쓰기'></Button>
      </form>
    </div>
  );
}