'use client'

import Button from '@/components/Button';
import styles from './page.module.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Post } from '../post/[id]/page';
import { FormEvent, useRef } from 'react';

export default function Write() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titleRef.current?.value) {
      alert('제목을 입력하세요');
    } else if (!contentRef.current?.value) {
      alert('내용을 입력하세요');
    } else {
      const post: Post = {
        title: titleRef.current!.value,
        content: contentRef.current!.value,
      };
  
      axios.post('/api/write', post)
        .then((res: AxiosResponse) => {
          console.log(res.data);
        })
        .catch((e: AxiosError) => {
          console.log(e);
        });
    }
  }

  return (
    <div>
      <form name='postForm' className={styles.form} onSubmit={onSubmit}>
        <input ref={titleRef} className={styles.title} placeholder='제목을 입력해주세요' />
        <textarea placeholder='내용을 입력해주세요' ref={contentRef} className={styles.content} rows={28} cols={100}></textarea>
        <Button className={styles.button} type="submit" text='글쓰기'></Button>
      </form>
    </div>
  );
}