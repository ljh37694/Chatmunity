import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/app/utils/datadbase';
import { Dm } from '@/types';
import DmRoom from '@/components/layout/DmRoom';

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
      <DmRoom session={session} dmList={dmList} title='HI' roomId={props.params.id} />
    </div>
  );
}