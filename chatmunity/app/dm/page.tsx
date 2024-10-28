import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/app/utils/datadbase';
import RoomItem from '@/components/ui/RoomItem';
import { DmRoom, Room } from '@/types';

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
  const roomList: Room[] = dmRoomList.map((item): Room => {
    return {
      title: session?.user?.email === item.member[0].email ? item.member[1].name : item.member[0].name,
      content: "asdfasdf",
      img: "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2023/05/18/da5c3b77-a0ce-4c18-b016-1b2a23ee4846.jpg",
    }
  });

  console.log(dmRoomList);

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