import { connectDB } from '@/app/utils/datadbase';
import FriendItem from '../ui/FriendItem';
import styles from '@/styles/layout/FriendsPanel.module.css';
import { Friend, Profile, UserData } from '@/types';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function FriendsPanel() {
  const client = await connectDB;
  const db = client.db('Chatmunity');

  const session = await getServerSession(authOptions);

  // 친구 id 찾기
  const friendIdList = await db.collection<Friend>('friend').find({
    user_id: session?.user?.email as string,
  }).map((item) => item.friend_id).toArray();

  // 친구 정보 찾기
  const friendList = await db.collection<UserData>('user').find({
    email: { $in: friendIdList },
  }).toArray();

  // 친구 프로필 리스트 생성
  const profileList: Profile[] = friendList.map((item) => ({
    name: item.name,
    img: item.image,
  }));

  await db.collection<UserData>('user').updateOne({
    email: session?.user?.email as string,
  }, {
    $set: { status: 'online' },
  });
  
  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Friends</h3>
      <section className={styles.content}>
        {profileList.map((item, idx) => {
          return (
            <FriendItem data={item} key={idx} />
          );
        })}
      </section>
    </div>
  );
}