import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <p>이름: {session?.user?.name}</p>
      <p>이메일: {session?.user?.email}</p>
    </div>
  )
}