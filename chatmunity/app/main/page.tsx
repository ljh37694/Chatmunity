import styles from './page.module.css';
import ChattingRoom from '@/components/ChattingRoom';
import { connectDB } from '../utils/datadbase';
import { Chat, Post } from '@/types';

export default async function Main() {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const result = await db.collection<Post>('post').find().toArray();

  const postList: Chat[] = result.map((item, idx): Chat => {
    return {
      content: item.title,
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <ChattingRoom chatList={postList} />
      </div>
    </div>
  );
}