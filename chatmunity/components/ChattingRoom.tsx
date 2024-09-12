import { Chat, Post } from '@/types';
import styles from './ChattingRoom.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface Props {
  chatList: Chat[],
  href?: string,
}

export default function ChattingRoom(props: Props) {
  const chatList = props.chatList;

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
        {chatList.map((item, idx) => {
          return (
            <div className={`${styles.post} ${idx % 2 === 0? styles.hotPost : ''}`} key={idx}>
              {
                props.href ? <Link className={styles.content} href={`/write/${idx}`}>{item.content}</Link> : <p className={styles.content}>{item.content}</p>
              }
            </div>
          );
        })}
      </section>
    </>
  );
}