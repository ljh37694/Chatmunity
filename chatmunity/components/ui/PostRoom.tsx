import styles from '@/styles/ui/PostRoom.module.css';
import { Post, Room } from '@/types';
import Link from 'next/link';
import PostInput from './PostInput';

interface Props {
  postList: Post[],
  roomData: Room | null,
}

export default function PostRoom(props: Props) {
  const { postList, roomData } = props;

  return (
    <div className={styles.container}>
      <nav className={styles.topNav}>
        <h3 className={styles.title}>{roomData?.id}</h3>
      </nav>

      <div className={styles.contentContainer}>
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

    </div>
  );
}