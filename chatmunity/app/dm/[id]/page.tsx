import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/app/utils/datadbase';
import { Chat, Dm } from '@/types';
import ChattingRoom from '@/components/common/ChattingRoom';
import ChattingList from '@/components/common/ChattingList';
import DmInput from '@/components/ui/DmInput';
import Chatting from '@/components/ui/Chatting';

interface Props {
  params: {
    id: string,
  }
}

export default async function DM(props: Props) {
  const { params: { id: roomId} } = props;
  
  const session = await getServerSession(authOptions);

  const client = await connectDB;
  const db = client.db('Chatmunity');

  const dmList: Dm[] = await db.collection<Dm>('dm').find<Dm>({ room_id: roomId }).toArray();

  return (
    <ChattingRoom title={"HI"}>
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