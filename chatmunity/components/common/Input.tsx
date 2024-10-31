'use client'

import styles from '@/styles/common/Input.module.css';
import Button from './Button';
import { useRef, useState } from 'react';

interface Props {
  buttonText: string,
  onSubmit: (e: React.FormEvent) => void,
  className?: string,
  textState: string,
  setText: React.Dispatch<React.SetStateAction<string>>,
}

export default function Input(props: Props) {
  const { buttonText, onSubmit, textState: text, setText } = props;

  return (
    <form className={`${styles.form} ${props.className}`} onSubmit={onSubmit}>
      <input className={styles.input} value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
      <Button text={buttonText} className={styles.button} />
    </form>
  );
}