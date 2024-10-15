import RoomItem from '@/components/ui/RoomItem';
import styles from './page.module.css';
import { Room } from '@/types';
import CreateRoom from '@/components/ui/CreateRoom';
import { connectDB } from '../utils/datadbase';

export default async function RoomPage() {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const roomList: Room[] = await db.collection<Room>('room').find().toArray();

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