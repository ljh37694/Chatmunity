import styles from '@/styles/layout/TogglePanel.module.css';
import LogoutButton from '../ui/LogoutButton';
import LoginButton from '../ui/LoginButton';
import { Session } from 'next-auth';

interface Props {
  show: boolean,
  session: Session | null,
}

export default function TogglePanel(props: Props) {
  const { session } = props;

  return (
    <div className={`${styles.container} ${props.show ? styles.show : ''}`}>
      <section className={styles.menuContainer}>
        <img src={session?.user?.image ? session.user.image : 'https://newsimg.sedaily.com/2024/04/24/2D81E11BA5_1.jpg'} className={styles.userImg} />
        <p>{!session?.user ? "user" : session?.user!.name}</p>
      </section>

      <section className={styles.menuContainer}>
        { props.session ? <LogoutButton /> : <LoginButton /> }
      </section>
    </div>
  )
}