'use client'

import styles from '@/styles/layout/TogglePanel.module.css';
import LogoutButton from '../ui/LogoutButton';
import LoginButton from '../ui/LoginButton';
import { Session } from 'next-auth';
import { Dispatch, SetStateAction, useRef } from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Props {
  session?: Session | null,
  setShow?: Dispatch<SetStateAction<boolean>>,
  show?: boolean,
  [key: string]: any,
}

export default function TogglePanel(props: Props) {
  const { setShow, show, ...rest } = props;

  const ref = useRef<HTMLDivElement>(null);
  const session = useSession();

  const userInfo = session.data?.user;

  const router = useRouter();

  return (
    <div ref={ref} className={`${styles.container}`} {...rest}>
      <section className={styles.menuContainer}>
        <img src={userInfo?.image ? userInfo.image : 'https://newsimg.sedaily.com/2024/04/24/2D81E11BA5_1.jpg'} className={styles.userImg} />
        <p>{userInfo ? userInfo.name : 'user'}</p>
      </section>

      <section className={styles.menuContainer}>
        <Button onClick={() => router.push('/mypage')} text='내정보' className={styles.myInfoBtn} />
        { props.session ? <LogoutButton /> : <LoginButton /> }
      </section>
    </div>
  )
}