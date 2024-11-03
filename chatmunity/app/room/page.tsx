import RoomItem from '@/components/ui/RoomItem';
import styles from './page.module.css';
import { PostRoomType } from '@/types';
import CreateRoom from '@/components/ui/CreateRoom';
import { connectDB } from '../utils/datadbase';

export default async function RoomPage() {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const result: PostRoomType[] = await db.collection<PostRoomType>('room').find().toArray();

  const roomList =  result.map((item): PostRoomType => {
    return {
      ...item,
      _id: item._id?.toString(),
    }
  });

  return (
    <div className={styles.container}>
      <CreateRoom />

      {
        roomList.map((item, idx) => {
          return (
            <RoomItem url={'/room/' + item.id} data={item} key={idx} />
          );
        })
      }
    </div>
  )
}