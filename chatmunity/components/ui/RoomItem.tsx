'use client'

import styles from '@/styles/ui/RoomItem.module.css';
import { Room } from '@/types';
import { useRouter } from 'next/navigation';

interface Props {
  data: Room,
}

export default function RoomItem(props: Props) {
  const { data } = props;
  const router = useRouter();

  return (
    <div className={styles.roomContainer} onClick={() => {
      router.push('/room/' + data.id);
    }}>
      <div>
        <img className={styles.roomImg} src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' />
      </div>
      <div>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.content}>구글은 신이에요!!</p>
      </div>
    </div>
  );
}