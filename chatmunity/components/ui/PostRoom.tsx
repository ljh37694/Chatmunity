import styles from '@/styles/ui/PostRoom.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Post } from '@/types';
import Link from 'next/link';

interface Props {
  postList: Post[],
}

export default function PostRoom(props: Props) {
  const postList = props.postList;

  return (
    <>
      <nav className={styles.topNav}>
        <div className={styles.box}></div>
        <h3 className={styles.title}>어쩌고 저쩌구</h3>
        <div className={styles.box}>
          <label className={styles.searchBtn}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>
        </div>
      </nav>

      <section className={styles.postContainer}>
        {postList.map((item, idx) => {
          return (
            <div className={`${styles.post} ${idx % 2 === 0 ? styles.hotPost : ''}`} key={idx}>
              <Link className={styles.content} href={{ pathname: `/post/${item._id}` }}>{item.content}</Link>
            </div>
          );
        })}
      </section>
    </>
  );
}