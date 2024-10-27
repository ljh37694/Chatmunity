import { DmRoom } from '@/types';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { connectDB } from '../utils/datadbase';
import RoomItem from '@/components/ui/RoomItem';

export default async function DmList() {
  const session = await getServerSession(authOptions);

  const client = await connectDB;
  const db = client.db('Chatmunity');

  const roomList = await db.collection<DmRoom>('dm').find({ member: { $in: [session?.user?.email as string]} }).toArray();

  return (
    <div>
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