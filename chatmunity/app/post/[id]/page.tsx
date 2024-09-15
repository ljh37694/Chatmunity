import { Post } from '@/types';
import styles from './page.module.css';
import Comments from '@/components/common/Comments';

interface Props {
  post: Post,
}

export default function PostDetail(props: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>제목</h3>
      <p className={styles.content}>내용</p>
      <div className={styles.commentContainer}>
        <Comments />
      </div>
    </div>
  );
}