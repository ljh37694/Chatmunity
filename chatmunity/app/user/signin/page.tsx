'use client';

import Button from '@/components/common/Button';
import styles from './page.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>

      <form className={styles.form}>
        <input className={styles.input} type="email" placeholder="Email" />
        <input className={styles.input} type="password" placeholder="Password" />
        <div className={styles.signContainer}>
          <Button className={styles.signButton} type="button" text="회원가입" onClick={() => router.push('/user/signup')} />
          <Button className={styles.signButton} type="submit" text="로그인" />
        </div>
      </form>

      <Button className={`${styles.button} ${styles.github}`} type="button" text="Github" onClick={() => signIn('github')} />
      <Button className={`${styles.button} ${styles.kakao}`} type="button" text="Kakao" onClick={() => signIn('kakao')} />
    </div>
  );
}