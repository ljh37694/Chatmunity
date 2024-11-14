'use client'

import styles from '@/styles/ui/TopNavbarInput.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function TopNavbarInput() {
  const router = useRouter();

  const [text, setText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.push('/search/' + encodeURIComponent(text));
  }

  useEffect(() => {
    if (inputRef.current?.value) {
      setText(inputRef.current.value);
    }
  }, [])

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <label>
        <FontAwesomeIcon icon={faMagnifyingGlass} color='#abffd6' />
      </label>

      <input className={styles.input} ref={inputRef} onInput={(e) => setText(e.currentTarget.value) } />
    </form>
  );
}