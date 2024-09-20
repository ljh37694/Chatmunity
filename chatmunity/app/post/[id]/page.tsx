import { Post } from '@/types';
import styles from './page.module.css';
import Comments from '@/components/common/Comments';
import { connectDB } from '@/app/utils/datadbase';
import { ObjectId } from 'mongodb';

interface Props {
  post: Post,
  params: { id: string },
}

export default async function PostDetail(props: Props) {
  const client = await connectDB;
  const db = client.db('Chatmunity');
  
  const result = await db.collection<Post>('post').findOne({ _id: new ObjectId(props.params.id)});

  console.log(props);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{result?.title}</h3>
      <p className={styles.content}>{result?.content}</p>
      <div className={styles.commentContainer}>
        <Comments postId={props.params.id} />
      </div>
    </div>
  );
}