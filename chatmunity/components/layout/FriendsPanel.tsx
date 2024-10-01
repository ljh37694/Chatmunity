import Friend from '../ui/Friend';
import styles from '@/styles/layout/FriendsPanel.module.css';
import { Profile } from '@/types';

export default function FriendsPanel() {
  const imgUrl = 'https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800';

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
    <div className={styles.panel}>
      <h3 className={styles.title}>Friends</h3>
      <section className={styles.content}>
        {profileList.map((item, idx) => {
          return (
            <Friend data={item} key={idx} />
          );
        })}
      </section>
    </div>
  );
}