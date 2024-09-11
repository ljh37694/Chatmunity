import { ObjectId } from 'mongodb';
import styles from './page.module.css';
import { Chat } from '@/components/ChattingRoom';

export interface Post {
  _id?: ObjectId,
  title: string,
  content: string,
}

interface Props {
  post: Post,
}

export default function Post(props: Props) {
  return (
    <div>
      <h3>제목</h3>
      <p>내용</p>
      <p>댓글임</p>
    </div>
  );
}