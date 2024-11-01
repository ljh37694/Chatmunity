import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/app/utils/datadbase';
import RoomItem from '@/components/ui/RoomItem';
import { DmRoom, Room, UserData } from '@/types';

interface Props {
  params: {
    id: string,
  }
}

export default async function DM(props: Props) {
  const session = await getServerSession(authOptions);

  const client = await connectDB;
  const db = client.db('Chatmunity');

  const dmRoomList: DmRoom[] = await db.collection<DmRoom>('dmRoom').find({ member: { $elemMatch: { email: session?.user?.email } } }).toArray();
  const roomList: Room[] = await Promise.all(
    dmRoomList.map(async (item) => {
      const other = await db.collection<UserData>('user').findOne({
        email: session?.user?.email !== item.member[0].email ? item.member[0].email : item.member[1].email,
      });

      const data = {
        _id: item._id,
        title: session?.user?.email !== item.member[0].email ? item.member[0].name : item.member[1].name,
        content: "HELLO",
        img: session?.user?.email === item.member[0].email ? session.user.image as string : other!.image as string,
      };

      return data;
    })
  );

  return (
    <div>
      {
        roomList.map((item, idx) => {
          return (
            <RoomItem url={'/dm/' + item._id} data={item} key={idx} />
          );
        })
      }
    </div>
  );
}