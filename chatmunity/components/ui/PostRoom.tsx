import styles from '@/styles/ui/PostRoom.module.css';
import { Post, PostRoomType } from '@/types';
import Link from 'next/link';
import PostInput from './PostInput';

interface Props {
  postList: Post[],
  roomData: PostRoomType | null,
}

export default function PostRoom(props: Props) {
  const { postList, roomData } = props;

  return (
    <div className={styles.container}>
      <section className={styles.postContainer}>
        {postList.map((item, idx) => {
          return (
            <div className={`${styles.post} ${idx % 2 === 0 ? styles.hotPost : ''}`} key={idx}>
              <Link className={styles.content} href={{ pathname: `/post/${item._id}` }}>{item.title}</Link>
            </div>
          );
        })}
      </section>

      <PostInput className={styles.input} roomId={roomData?.id as string} />
    </div>
  );
}