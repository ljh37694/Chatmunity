'use client';

import Button from '@/components/common/Button';
import styles from './page.module.css';
import { useRef, useState } from 'react';
import axios from 'axios';
import { UserData } from '@/types';
import { useRouter } from 'next/navigation';

type Status = 'normal' | 'success' | 'error';

export default function Signup() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const [emailStatus, setEmailStatus] = useState<Status>('normal');
  const [passwordStatus, setPasswordStatus] = useState<Status>('normal');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<Status>('normal');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordStatus !== 'success' || confirmPasswordStatus !== 'success') {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    else if (emailStatus !== 'success') {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    else if (passwordStatus !== 'success') {
      alert('비밀번호 형식이 올바르지 않습니다.');
      return;
    }

    else {
      const userData: UserData = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        name: nameRef.current?.value,
        created_at: new Date().toISOString(),
        status: 'offline',
        image: imgRef.current?.value,
        id: emailRef.current?.value as string,
      };

      axios.post<UserData>('/api/auth/signup', userData).then((res) => {
        console.log(res);
        
        alert('회원가입이 완료되었습니다.');
      }).catch((e) => {
        alert(e.response.data.message);
      });
    }
  };

  const handleValidatePassword = (e: React.FocusEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(e.target.value)) {
      setPasswordStatus('error');
    } else {
      setPasswordStatus('success');
    }
  };

  const handleConfirmPassword = () => {
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setConfirmPasswordStatus('error');
    } else {
      setConfirmPasswordStatus('success');
    }
  };

  const handleValidateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(e.target.value)) {
      setEmailStatus('error');
    } else {
      setEmailStatus('success');
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Sign Up</h1>

      <input className={`${styles.input} ${styles[emailStatus]}`} type="email" placeholder="Email" onBlur={handleValidateEmail} ref={emailRef} />
      <input className={styles.input} type="text" placeholder="Username" ref={nameRef} />
      <input className={styles.input} type="text" placeholder="Profile Image URL" ref={imgRef} />
      <input className={`${styles.input} ${styles[passwordStatus]}`} type="password" placeholder="Password" ref={passwordRef} onBlur={handleValidatePassword} />
      <input className={`${styles.input} ${styles[confirmPasswordStatus]}`} type="password" placeholder="Confirm Password" ref={confirmPasswordRef} onBlur={handleConfirmPassword} />
      {confirmPasswordStatus === 'error' && <p className={styles.errorText}>비밀번호가 일치하지 않습니다.</p>}
      <Button className={styles.button} type="submit" text="회원가입" />
    </form>
  );
}
