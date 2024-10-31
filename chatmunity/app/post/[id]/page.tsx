import { Chat, CommentType, Post, UserData } from '@/types';
import styles from './page.module.css';
import { connectDB } from '@/app/utils/datadbase';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ChattingRoom from '@/components/common/ChattingRoom';
import CommentInput from '@/components/ui/CommentInput';
import Comment from '@/components/ui/Comment';
import PostHeader from '@/components/ui/PostHeader';

interface Props {
  params: { id: string },
}

export default async function PostDetail(props: Props) {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const session = await getServerSession(authOptions);
  
  const postData = await db.collection<Post>('post').findOne({ _id: new ObjectId(props.params.id)});
  const commentList = await db.collection<CommentType>('comment').find({ post_id: props.params.id }).toArray();

  return (
    <div className={styles.container}>
      <PostHeader postData={postData} />
      <h3 className={styles.title}>{postData?.title}</h3>
      <p className={styles.content}>{postData?.content}</p>
      <div className={styles.commentContainer}>
        <CommentInput session={session} postId={props.params.id} />
        <ChattingRoom chatList={commentList}>
          { 
            commentList.map((item, idx) => {
              return (
                <Comment postData={postData as Post} commentData={item} session={session} key={idx} />
              );
            })
          }
        </ChattingRoom>
      </div>
    </div>
  );
}