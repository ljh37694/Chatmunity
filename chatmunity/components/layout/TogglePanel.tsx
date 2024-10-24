'use client'

import styles from '@/styles/layout/TogglePanel.module.css';
import LogoutButton from '../ui/LogoutButton';
import LoginButton from '../ui/LoginButton';
import { Dispatch, SetStateAction, useRef } from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Props {
  setShow?: Dispatch<SetStateAction<boolean>>,
  show?: boolean,
  [key: string]: any,
}

export default function TogglePanel(props: Props) {
  const { setShow, show, ...rest } = props;

  const ref = useRef<HTMLDivElement>(null);
  const { data: session, status} = useSession();

  const router = useRouter();

  return (
    <div ref={ref} className={`${styles.container}`} {...rest}>
      <section className={`${styles.menuContainer} ${styles.userInfo}`}>
        <img src={session?.user?.image ? session?.user?.image  : 'https://newsimg.sedaily.com/2024/04/24/2D81E11BA5_1.jpg'} className={styles.userImg} />
        <p>{status === 'authenticated' ? session.user?.name : 'user'}</p>
      </section>

      <section className={styles.menuContainer}>
        <Button onClick={() => router.push('/mypage')} text='내정보' className={styles.myInfoBtn} />
        { status === "authenticated" ? <LogoutButton /> : <LoginButton /> }
      </section>
    </div>
  )
}