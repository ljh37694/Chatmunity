import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/app/utils/datadbase';
import { Dm } from '@/types';
import ChattingRoom from '@/components/common/ChattingRoom';
import Chatting from '@/components/ui/Chatting';

interface Props {
  params: {
    id: string,
  }
}

export default async function DM(props: Props) {
  const session = await getServerSession(authOptions);

  const client = await connectDB;
  const db = client.db('Chatmunity');

  const dmList: Dm[] = await db.collection<Dm>('dm').find({ roomId: props.params.id }).toArray();

  return (
    <div>
      <ChattingRoom title='hi' chatList={dmList}>
        {
          dmList.map((item, idx) => {
            return (
              <Chatting chatData={item} isWriter={item.writer === session?.user?.email} />
            )
          })
        }
      </ChattingRoom>
    </div>
  );
}