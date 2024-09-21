import { Post } from '@/types';
import styles from './page.module.css';
import Comments from '@/components/common/Comments';
import { connectDB } from '@/app/utils/datadbase';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface Props {
  post: Post,
  params: { id: string },
}

export default async function PostDetail(props: Props) {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const session = await getServerSession(authOptions);
  
  const result = await db.collection<Post>('post').findOne({ _id: new ObjectId(props.params.id)});

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{result?.title}</h3>
      <p className={styles.content}>{result?.content}</p>
      <div className={styles.commentContainer}>
        <Comments postId={props.params.id} session={session} />
      </div>
    </div>
  );
}