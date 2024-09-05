import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FriendsPanel.module.css';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export default function FriendsPanel() {
  const imgUrl = 'https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800';

  interface Profile {
    name: string,
    img: string,
  }

  const profileList: Profile[] = [
    { name: 'Lee', img: imgUrl },
    { name: 'Kai', img: imgUrl },
    { name: 'Lee', img: imgUrl },
    { name: 'Kai', img: imgUrl },
    { name: 'Lee', img: imgUrl },
    { name: 'Kai', img: imgUrl },
    { name: 'Lee', img: imgUrl },
    { name: 'Kai', img: imgUrl },
    { name: 'Lee', img: imgUrl },
    { name: 'Kai', img: imgUrl },
  ];
  
  return (
    <div id={styles.panel}>
      <h3 className={styles.title}>Friends</h3>
      <section className={styles.content}>
        {profileList.map((item, idx) => {
          return (
            <label className={styles.friend} key={idx}>
              <div className={styles.profile}>
                <img src={item.img} />
                <FontAwesomeIcon className={styles.status} icon={faCircle} />
              </div>
              
              <p>{item.name}</p>
            </label>
          );
        })}
      </section>
    </div>
  );
}