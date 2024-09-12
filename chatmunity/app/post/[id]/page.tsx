import { Post } from '@/types';
import styles from './page.module.css';

interface Props {
  post: Post,
}

export default function PostDetail(props: Props) {
  return (
    <div>
      <h3>제목</h3>
      <p>내용</p>
      <p>댓글임</p>
    </div>
  );
}