'use client';

import Button from '@/components/common/Button';
import styles from './page.module.css';
import { useRef, useState } from 'react';

export default function Signup() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  };

  const handleConfirmPassword = () => {
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setIsPasswordMatch(false);
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      setIsPasswordMatch(true);
    }
  };

  const handleValidateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(e.target.value)) {
      alert('이메일 형식이 올바르지 않습니다.');
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Sign Up</h1>
      <input className={styles.input} type="email" placeholder="Email" onBlur={handleValidateEmail} />
      <input className={styles.input} type="text" placeholder="Username" />
      <input className={styles.input} type="text" placeholder="Profile Image URL" />
      <input className={`${styles.input} ${isPasswordMatch ? styles.passwordSuccess : ''}`} type="password" placeholder="Password" ref={passwordRef} />
      <input className={`${styles.input} ${!isPasswordMatch ? styles.passwordError : styles.passwordSuccess}`} type="password" placeholder="Confirm Password" ref={confirmPasswordRef} onBlur={handleConfirmPassword} />
      {!isPasswordMatch && <p className={styles.passwordErrorText}>비밀번호가 일치하지 않습니다.</p>}
      <Button className={styles.button} type="submit" text="회원가입" />
    </form>
  );
}
