import { Chat, Post } from '@/types';
import styles from './page.module.css';
import CommentList from '@/components/common/CommentList';
import { connectDB } from '@/app/utils/datadbase';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ChattingRoom from '@/components/common/ChattingRoom';

interface Props {
  post: Post,
  params: { id: string },
}

export default async function PostDetail(props: Props) {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const session = await getServerSession(authOptions);
  
  const postData = await db.collection<Post>('post').findOne({ _id: new ObjectId(props.params.id)});
  const chatList = await db.collection<Chat>('chat').find({ post_id: props.params.id }).toArray();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{postData?.title}</h3>
      <p className={styles.content}>{postData?.content}</p>
      <div className={styles.commentContainer}>
        <ChattingRoom chatList={chatList} />
      </div>
    </div>
  );
}