import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/app/utils/datadbase';
import RoomItem from '@/components/ui/RoomItem';
import { Dm, DmRoom, Room, UserData } from '@/types';

export default async function DM() {
  const session = await getServerSession(authOptions);

  const client = await connectDB;
  const db = client.db('Chatmunity');

  const dmRoomList: DmRoom[] = await db.collection<DmRoom>('dmRoom').find({ member: { $elemMatch: { email: session?.user?.email } } }).toArray();

  return (
    <div>
      {
        dmRoomList.map(async (item, idx) => {
          const lastDm = await db.collection<Dm>('dm').findOne({ room_id: item._id?.toString() }, { sort: { date: -1 }});
          const otherUser = await db.collection<UserData>('user').findOne({
           email: item.member[0].email === session?.user?.email ? item.member[1].email : item.member[0].email,
          });

          console.log(item._id);

          const data: Room = {
            ...item,
            content: lastDm?.content as string,
            img: otherUser?.image as string,
            title: otherUser?.name as string,
            _id: item._id?.toString(),
          }

          console.log(lastDm);

          return (
            <RoomItem url={'/dm/' + item._id} data={data} key={idx} />
          );
        })
      }
    </div>
  );
}