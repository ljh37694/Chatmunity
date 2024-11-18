import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LogoutButton from '@/components/ui/LogoutButton';
import LoginButton from '@/components/ui/LoginButton';

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.container}>
      <p className={styles.info}>이름: {session?.user?.name}</p>
      <p className={styles.info}>이메일: {session?.user?.email}</p>

      {
        session?.user ? <LogoutButton /> : <LoginButton />
      }
    </div>
  )
}