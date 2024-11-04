import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/app/utils/datadbase';
import { Chat, Dm, DmRoom, UserData } from '@/types';
import ChattingRoom from '@/components/common/ChattingRoom';
import ChattingList from '@/components/common/ChattingList';
import DmInput from '@/components/ui/DmInput';
import Chatting from '@/components/ui/Chatting';
import { ObjectId } from 'mongodb';

interface Props {
  params: {
    id: string,
  }
}

export default async function DM(props: Props) {
  const { params: { id: roomId } } = props;
  
  const session = await getServerSession(authOptions);

  const client = await connectDB;
  const db = client.db('Chatmunity');

  const dmList: Dm[] = await db.collection<Dm>('dm').find<Dm>({ room_id: roomId }).toArray();

  const roomData = await db.collection<DmRoom>('dmRoom').findOne({ _id: new ObjectId(roomId) });
  console.log(roomData);

  const otherUser = roomData?.member[0].email === session?.user?.email ? roomData?.member[1] : roomData?.member[0];

  return (
    <ChattingRoom title={otherUser!.name}>
      <ChattingList inputComp={<DmInput roomId={roomId} session={session} />}>
        {
          dmList.map(async (item, idx) => {            
            const data: Chat = {
              ...item,
              _id: item._id?.toString(),
            }
            return (
              <Chatting chatData={data} isOtherChat={item.writer !== session?.user?.email} key={idx} />
            );
          })
        }
      </ChattingList>
    </ChattingRoom>
  );
}