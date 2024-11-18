'use client'

import styles from '@/styles/ui/RoomItem.module.css';
import { Room } from '@/types';
import { useRouter } from 'next/navigation';

interface Props {
  data: Room,
  url: string,
}

export default function RoomItem(props: Props) {
  const { data, url } = props;
  const router = useRouter();

  return (
    <div className={styles.roomContainer} onClick={() => {
      router.push(url);
    }}>
      <div>
        <img className={styles.roomImg} src={data.image ? data.image : "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"} />
      </div>
      <div>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.content}>{data.content}</p>
      </div>
    </div>
  );
}