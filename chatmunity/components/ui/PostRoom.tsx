import styles from '@/styles/ui/PostRoom.module.css';
import { Post } from '@/types';
import Link from 'next/link';
import PostInput from './PostInput';

interface Props {
  postList: Post[],
  roomId: string,
}

export default function PostRoom(props: Props) {
  const postList = props.postList;

  return (
    <div className={styles.container}>
      <nav className={styles.topNav}>
        <h3 className={styles.title}>어쩌고 저쩌구</h3>
      </nav>

      <section className={styles.postContainer}>
        {postList.map((item, idx) => {
          return (
            <div className={`${styles.post} ${idx % 2 === 0 ? styles.hotPost : ''}`} key={idx}>
              <Link className={styles.content} href={{ pathname: `/post/${item._id}` }}>{item.title}</Link>
            </div>
          );
        })}
      </section>
      <PostInput roomId={props.roomId} />
    </div>
  );
}