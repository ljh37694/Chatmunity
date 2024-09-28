'use client'

import styles from '@/styles/layout/TogglePanel.module.css';
import LogoutButton from '../ui/LogoutButton';
import LoginButton from '../ui/LoginButton';
import { Session } from 'next-auth';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

interface Props {
  session: Session | null,
  setShow: Dispatch<SetStateAction<boolean>>,
  [key: string]: any,
}

export default function TogglePanel(props: Props) {
  const { setShow, session, ...rest } = props;

  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const clickOut = (e: MouseEvent) =>{
    if (props.show && ref.current && !ref.current.contains(e.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOut);

    return () => {
      document.removeEventListener('mousedown', clickOut);
    }
  }, []);

  return (
    <div ref={ref} className={`${styles.container}`} {...rest}>
      <section className={styles.menuContainer}>
        <img src={session?.user?.image ? session.user.image : 'https://newsimg.sedaily.com/2024/04/24/2D81E11BA5_1.jpg'} className={styles.userImg} />
        <p>{!session?.user ? "user" : session?.user!.name}</p>
      </section>

      <section className={styles.menuContainer}>
        <Button onClick={() => router.push('/mypage')} text='내정보' className={styles.myInfoBtn} />
        { props.session ? <LogoutButton /> : <LoginButton /> }
      </section>
    </div>
  )
}