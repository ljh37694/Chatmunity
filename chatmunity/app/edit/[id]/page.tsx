'use client'

import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import Button from '@/components/common/Button';
import axios, { AxiosResponse } from 'axios';
import { Post } from '@/types';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    id: string,
  }
}

export default function Edit(props: Props) {
  const [title, setTitle] = useState<string>('');
  const [postData, setPostData] = useState<Post>();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  useEffect(() => {
    axios.get<Post>('/api/write?_id=' + props.params.id)
      .then((res) => {
        setPostData(res.data);
        setTitle(res.data.title);
        contentRef.current!.value = res.data.content;
      })
      .catch(e => console.log(e));
  }, []);
 
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titleRef.current?.value) {
      alert('제목을 입력하세요');
    } else if (!contentRef.current?.value) {
      alert('내용을 입력하세요');
    } else {
      axios.put('/api/write', {
        ...postData,
        title: titleRef.current.value,
        content: contentRef.current.value,
      })
        .then(() => {
          router.back();
        })
        .catch(e => console.log(e));
    }
  }

  return (
    <form name='postForm' className={styles.form} onSubmit={onSubmit}>
      <input value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} ref={titleRef} className={styles.title} placeholder='제목을 입력해주세요' />
      <textarea wrap='hard' placeholder='내용을 입력해주세요' ref={contentRef} className={styles.content} rows={28} cols={100}></textarea>
      <Button className={styles.button} type="submit" text='수정하기' />
    </form>
  )
}