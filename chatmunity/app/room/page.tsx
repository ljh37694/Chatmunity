import RoomItem from '@/components/ui/RoomItem';
import styles from './page.module.css';
import { Room } from '@/types';
import CreateRoom from '@/components/ui/CreateRoom';

export default function RoomPage() {
  const roomList: Room[] = [
    {
      title: '구글',
      id: "google",
    },
    {
      title: "애플",
      id: "apple",
    },
    {
      title: '아마존',
      id: "amazon",
    },
  ];

  return (
    <div className={styles.container}>
      <CreateRoom />

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