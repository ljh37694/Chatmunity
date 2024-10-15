'use client'

import Button from '@/components/common/Button';
import styles from './page.module.css';
import axios from 'axios';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRoom() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  return (
    <form className={styles.form} onSubmit={(e: React.FormEvent) => {
      e.preventDefault();

    if (!nameInputRef.current?.value) {
        alert('이름이 빈칸입니다');
      } else if (!idInputRef.current?.value) {
        alert('아이디가 빈칸입니다');
      } else if (!idInputRef.current.value.match(/^[a-z0-9_-]{2,10}$/)) {
        alert('아이디는 알파벳 소문자, 숫자, -, _만 사용할 수 있습니다');
      } else {
        axios.post("/api/room", {
          title: nameInputRef.current?.value,
          id: idInputRef.current?.value,
        })
          .then((res) => {
            router.push('/room');
            router.refresh();
          })
          .catch(e => {
            console.log(e);
            if (e.response.data.message === "duplicated id") {
              alert("중복된 아이디입니다");
            }
          })
      }
    }}>
      <input className={styles.input} placeholder='방 이름을 입력하세요' ref={nameInputRef} />
      <input className={styles.input} placeholder='방 아이디를 입력하세요' ref={idInputRef} />
      <Button className={styles.btn} text='만들기' type="submit" />
    </form>
  );
}