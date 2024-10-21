'use client'

import styles from '@/styles/ui/PostInput.module.css';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

interface Props {
  roomId: string,
  className: string,
}

export default function PostInput(props: Props) {
  const router = useRouter();
 
  const inputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState<string>('');

  console.log(props);

  return (
    <form className={`${styles.form} ${props.className}`} onSubmit={(e: React.FormEvent) => {
      e.preventDefault();

      if (!inputRef.current?.value) {
        alert('빈 칸입니다');
      } else {
        console.log(inputRef.current.value);

        const title: string = inputRef.current.value;

        router.push('/write/' + props.roomId + "?title=" + encodeURIComponent(title));
      }
    }}>
      <input className={styles.input} value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} ref={inputRef} />
      <Button text='글쓰기' className={styles.button} />
    </form>
  );
}