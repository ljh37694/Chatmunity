import RoomItem from '@/components/ui/RoomItem';
import styles from './page.module.css';
import { Room } from '@/types';

export default function RoomPage() {
  const roomList: Room[] = [
    {
      title: '구글',
    },
    {
      title: "애플",
    },
    {
      title: '아마존',
    },
    {
      title: '구글',
    },
    {
      title: "애플",
    },
    {
      title: '아마존',
    },
    {
      title: '구글',
    },
    {
      title: "애플",
    },
    {
      title: '아마존',
    },
  ];

  return (
    <div className={styles.container}>
      {
        roomList.map((item, idx) => {
          return (
            <RoomItem data={item} key={idx} />
          );
        })
      }
    </div>
  )
}