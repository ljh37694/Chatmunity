import { getServerSession } from 'next-auth';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LogoutButton from '@/components/ui/LogoutButton';
import LoginButton from '@/components/ui/LoginButton';

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>마이페이지</h1>

      <section className={styles.userContainer}>
        <img src={session?.user?.image as string} alt="프로필 이미지" className={styles.profile} />

        <div className={styles.infoContainer}>
          <p className={`${styles.info} ${styles.name}`}>{session?.user?.name}</p>
          <p className={`${styles.info} ${styles.email}`}>{session?.user?.email}</p>
        </div>
      </section>

      <div className={styles.buttonContainer}>
        {
          session?.user ? <LogoutButton /> : <LoginButton />
        }
      </div>
    </div>
  )
}