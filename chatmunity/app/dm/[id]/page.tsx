import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/app/utils/datadbase';
import RoomItem from '@/components/ui/RoomItem';
import { DmRoom } from '@/types';

interface Props {
  params: {
    id: string,
  }
}

export default async function DM(props: Props) {
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
  );
}