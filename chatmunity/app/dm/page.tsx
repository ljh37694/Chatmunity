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
  const roomList: Room[] = await Promise.all(
    dmRoomList.map(async (item) => {
      const other = await db.collection<UserData>('user').findOne({
        email: session?.user?.email !== item.member[0].email ? item.member[0].email : item.member[1].email,
      });

      const lastDm = await db.collection<Dm>('dm').findOne();

      const data = {
        _id: item._id,
        title: session?.user?.email !== item.member[0].email ? item.member[0].name : item.member[1].name,
        content: lastDm?.content as string,
        img: session?.user?.email === item.member[0].email ? session.user.image as string : other!.image as string,
      };

      return data;
    })
  );

  return (
    <div>
      {
        roomList.map(async (item, idx) => {
          const lastDm = await db.collection<Dm>('dm').findOne({ room_id: item._id as string });

          const data: Room = {
            ...item,
            content: lastDm?.content as string,
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