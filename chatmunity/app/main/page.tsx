import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface Post {
  title: string,
  id?: string,
}

export default function Main() {
  const postList: Post[] = [
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
    { title: "내용" },
  ];

  return (
    <div className={styles.container}>
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
            <div className={`${styles.post} ${idx % 2 === 0? styles.hotPost : ''}`} key={idx}>
              <p>{item.title}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}