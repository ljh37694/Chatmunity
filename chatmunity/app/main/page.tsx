import styles from './page.module.css';
import ChattingRoom from '@/components/common/ChattingRoom';
import { connectDB } from '../utils/datadbase';
import { Chat, Post } from '@/types';
import PostRoom from '@/components/ui/PostRoom';

export default async function Main() {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const result = await db.collection<Post>('post').find().toArray();

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <PostRoom postList={result} />
      </div>
    </div>
  );
}